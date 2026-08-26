import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { chatService, createSocket } from "../services/chatService";
import ConversationList from "../components/chat/ConversationList";
import ChatWindow from "../components/chat/ChatWindow";
import Navbar from "../components/layout/Navbar";

export default function OwnerMessages() {
  const { user, token, isOwner } = useAuth();

  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(null);
  const [onlineCustomers, setOnlineCustomers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [customerLastSeen, setCustomerLastSeen] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  // Mobile: "list" | "chat"
  const [mobileView, setMobileView] = useState("list");

  // ---- Access guard ----
  if (!isOwner) {
    return (
      <div className="min-h-screen bg-[#FDF4D2] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-center px-6">
          <div>
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="text-xl font-bold text-[#6B6D43] mb-2">
              Access Denied
            </h2>
            <p className="text-[#946D6D] text-sm">
              This page is only accessible to the bakery owner.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ---- Load conversations & socket ----
  useEffect(() => {
    let sock = null;

    (async () => {
      try {
        const convs = await chatService.getOwnerConversations(token);
        setConversations(Array.isArray(convs) ? convs : []);
      } catch {
        setConversations([]);
      }
    })();

    sock = createSocket(token);
    setSocket(sock);

    sock.on("connect", () => setIsConnected(true));
    sock.on("disconnect", () => setIsConnected(false));
    sock.on("connect_error", () => setIsConnected(false));

    sock.on("userOnline", ({ userId }) => {
      setOnlineCustomers((prev) =>
        prev.includes(userId) ? prev : [...prev, userId]
      );
    });
    sock.on("userOffline", ({ userId, lastSeen }) => {
      setOnlineCustomers((prev) => prev.filter((id) => id !== userId));
      setCustomerLastSeen(lastSeen || null);
    });

    // New message on any conversation (update list preview)
    sock.on("receiveMessage", (msg) => {
      setConversations((prev) =>
        prev.map((c) =>
          c._id === msg.conversationId
            ? {
                ...c,
                lastMessage: msg,
                unreadCountOwner: (c.unreadCountOwner || 0) + 1,
                updatedAt: msg.createdAt,
              }
            : c
        )
      );

      // If the message belongs to the currently open conversation, add it
      setActiveConversation((active) => {
        if (active?._id === msg.conversationId) {
          setMessages((prev) => [...prev, msg]);
        }
        return active;
      });
    });

    sock.on("typing", ({ conversationId, senderName }) => {
      setActiveConversation((active) => {
        if (active?._id === conversationId) {
          setTypingUser(senderName || "Customer");
        }
        return active;
      });
    });

    sock.on("stopTyping", ({ conversationId }) => {
      setActiveConversation((active) => {
        if (active?._id === conversationId) setTypingUser(null);
        return active;
      });
    });

    return () => {
      sock?.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Select conversation ----
  const handleSelectConversation = async (conv) => {
    setActiveConversation(conv);
    setMessages([]);
    setTypingUser(null);
    setMobileView("chat");
    setLoadingMessages(true);

    // Leave old room, join new
    if (activeConversation?._id) {
      socket?.emit("leaveConversation", activeConversation._id);
    }
    socket?.emit("joinConversation", conv._id);

    try {
      const msgs = await chatService.getMessages(conv._id, token);
      setMessages(Array.isArray(msgs) ? msgs : []);
    } catch {
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }

    // Clear unread
    setConversations((prev) =>
      prev.map((c) =>
        c._id === conv._id ? { ...c, unreadCountOwner: 0 } : c
      )
    );
  };

  // ---- Send message ----
  const handleSend = (payload) => {
    if (!activeConversation?._id) return;

    const optimistic = {
      tempId: `temp_${Date.now()}`,
      _id: `temp_${Date.now()}`,
      content: payload.content,
      messageType: payload.messageType,
      attachmentUrl: payload.attachmentUrl,
      sender: { _id: user._id },
      senderRole: "admin",
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    setMessages((prev) => [...prev, optimistic]);

    socket?.emit("sendMessage", {
      conversationId: activeConversation._id,
      ...payload,
    });
  };

  const handleTyping = () => {
    if (activeConversation?._id) {
      socket?.emit("typing", {
        conversationId: activeConversation._id,
        senderName: "Owner",
      });
    }
  };

  const handleStopTyping = () => {
    if (activeConversation?._id) {
      socket?.emit("stopTyping", { conversationId: activeConversation._id });
    }
  };

  const handleMarkRead = (convId) => {
    chatService.markRead(convId, token).catch(() => {});
  };

  const handleResolve = async () => {
    if (!activeConversation?._id) return;
    try {
      await chatService.resolveConversation(activeConversation._id, token);
      setConversations((prev) =>
        prev.map((c) =>
          c._id === activeConversation._id ? { ...c, status: "resolved" } : c
        )
      );
      setActiveConversation((c) => (c ? { ...c, status: "resolved" } : c));
    } catch {
      // silent
    }
  };

  const isActiveCustomerOnline =
    activeConversation &&
    onlineCustomers.includes(activeConversation.customerId);

  return (
    <div className="min-h-screen bg-[#FDF4D2] flex flex-col">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex flex-1 max-w-7xl mx-auto w-full bg-white rounded-3xl shadow-xl my-6 overflow-hidden">

          {/* ----- Desktop layout: left sidebar + right chat ----- */}
          {/* Conversation list (hidden on mobile when chat is open) */}
          <div
            className={`
              w-full md:w-80 md:flex-shrink-0 flex flex-col
              ${mobileView === "chat" ? "hidden md:flex" : "flex"}
            `}
          >
            <ConversationList
              conversations={conversations}
              activeId={activeConversation?._id}
              onSelect={handleSelectConversation}
              onlineCustomers={onlineCustomers}
            />
          </div>

          {/* Chat panel */}
          <div
            className={`
              flex-1 flex flex-col min-w-0
              ${mobileView === "list" ? "hidden md:flex" : "flex"}
            `}
          >
            {activeConversation ? (
              <>
                {/* Resolve button bar */}
                <div className="flex items-center justify-end px-4 py-2 border-b border-[#E1B8A2] bg-[#FDF4D2]/60 flex-shrink-0">
                  {activeConversation.status !== "resolved" ? (
                    <button
                      onClick={handleResolve}
                      className="text-xs font-bold text-white bg-[#6B6D43] hover:bg-[#CF7D65] px-4 py-1.5 rounded-full transition"
                    >
                      ✅ Mark as Resolved
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                      ✅ Resolved
                    </span>
                  )}
                </div>

                {loadingMessages ? (
                  <div className="flex-1 flex items-center justify-center text-[#946D6D] text-sm">
                    Loading messages…
                  </div>
                ) : (
                  <ChatWindow
                    conversation={{
                      ...activeConversation,
                      title: activeConversation.customerName || "Customer",
                    }}
                    messages={messages}
                    isOnline={isActiveCustomerOnline}
                    lastSeen={customerLastSeen}
                    typingUser={typingUser}
                    currentUser={user}
                    onSend={handleSend}
                    onTyping={handleTyping}
                    onStopTyping={handleStopTyping}
                    onBack={() => setMobileView("list")}
                    onMarkRead={handleMarkRead}
                    isConnected={isConnected}
                  />
                )}
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6 text-[#946D6D]">
                <div className="text-5xl mb-4">💌</div>
                <p className="font-semibold text-[#6B6D43]">
                  Select a conversation
                </p>
                <p className="text-sm mt-1">
                  Choose a customer chat from the left panel.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
