import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { chatService, createSocket } from "../services/chatService";
import ChatWindow from "../components/chat/ChatWindow";
import QuickMessages from "../components/chat/QuickMessages";
import Navbar from "../components/layout/Navbar";

// ----------------------------------------------------------
// Guest Prompt — shown when user is not authenticated
// ----------------------------------------------------------
function GuestPrompt({ onSubmit }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    setError("");
    onSubmit(name.trim(), phone.trim());
  };

  return (
    <div className="min-h-screen bg-[#FDF4D2] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">💬</div>
          <h2 className="text-xl font-bold text-[#6B6D43]">
            Chat with Elegant Eats
          </h2>
          <p className="text-[#946D6D] text-sm mt-1">
            Enter your details to start chatting with our team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#6B6D43] mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Ahmed"
              className="w-full border-2 border-[#E1B8A2] focus:border-[#CF7D65] rounded-2xl px-4 py-2.5 text-sm outline-none transition text-[#6B6D43]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6B6D43] mb-1">
              Phone / WhatsApp
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 0300-1234567"
              className="w-full border-2 border-[#E1B8A2] focus:border-[#CF7D65] rounded-2xl px-4 py-2.5 text-sm outline-none transition text-[#6B6D43]"
            />
          </div>

          {error && (
            <p className="text-xs text-rose-600 font-semibold">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#CF7D65] hover:bg-[#6B6D43] text-white font-bold py-3 rounded-2xl shadow-md transition"
          >
            Start Chatting 🎂
          </button>
        </form>
      </div>
    </div>
  );
}

// ----------------------------------------------------------
// CustomerChat page
// ----------------------------------------------------------
export default function CustomerChat() {
  const { user, token, loginAsGuest } = useAuth();
  const location = useLocation();

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(null);
  const [ownerOnline, setOwnerOnline] = useState(false);
  const [ownerLastSeen, setOwnerLastSeen] = useState(null);
  const [typingUser, setTypingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill draft from navigation state (e.g., from CustomCakeBuilder)
  const prefillMessage = location.state?.prefillMessage || null;
  const [draft, setDraft] = useState(prefillMessage);

  // ---- Load conversation + connect socket ----
  useEffect(() => {
    if (!user) return;

    let sock = null;
    setLoading(true);

    (async () => {
      try {
        const conv = await chatService.getConversation(token).catch(() => null);
        if (conv) {
          setConversation(conv);
          const msgs = await chatService
            .getMessages(conv._id, token)
            .catch(() => []);
          setMessages(Array.isArray(msgs) ? msgs : []);
        }
      } catch {
        setError("Unable to load conversation.");
      } finally {
        setLoading(false);
      }
    })();

    // Socket
    sock = createSocket(token);
    setSocket(sock);

    sock.on("connect", () => setIsConnected(true));
    sock.on("disconnect", () => setIsConnected(false));
    sock.on("connect_error", () => setIsConnected(false));

    sock.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    sock.on("typing", () => setTypingUser("Owner"));
    sock.on("stopTyping", () => setTypingUser(null));
    sock.on("userOnline", () => {
      setOwnerOnline(true);
    });
    sock.on("userOffline", ({ lastSeen }) => {
      setOwnerOnline(false);
      if (lastSeen) setOwnerLastSeen(lastSeen);
    });

    return () => {
      sock?.disconnect();
    };
  }, [user?._id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Join conversation room when both socket and conversation are ready
  useEffect(() => {
    if (socket && conversation?._id) {
      socket.emit("joinConversation", conversation._id);
    }
  }, [socket, conversation?._id]);

  // ---- Handlers ----
  const handleSend = (payload) => {
    if (!conversation?._id) return;

    const optimistic = {
      tempId: `temp_${Date.now()}`,
      _id: `temp_${Date.now()}`,
      content: payload.content,
      messageType: payload.messageType,
      attachmentUrl: payload.attachmentUrl,
      sender: { _id: user._id },
      senderRole: user.role,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    setMessages((prev) => [...prev, optimistic]);

    socket?.emit("sendMessage", {
      conversationId: conversation._id,
      ...payload,
    });
  };

  const handleTyping = () => {
    if (conversation?._id) socket?.emit("typing", { conversationId: conversation._id });
  };

  const handleStopTyping = () => {
    if (conversation?._id) socket?.emit("stopTyping", { conversationId: conversation._id });
  };

  const handleMarkRead = (convId) => {
    chatService.markRead(convId, token).catch(() => {});
  };

  const handleQuickSelect = (text) => {
    setDraft(text);
  };

  // ---- Guest prompt ----
  if (!user) {
    return <GuestPrompt onSubmit={(name, phone) => loginAsGuest(name, phone)} />;
  }

  const showQuickMessages = messages.length === 0 && !loading;

  return (
    <div className="min-h-screen bg-[#FDF4D2] flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-start px-4 py-6">
        <div className="w-full max-w-2xl flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden flex-1 min-h-[70vh]">
          {loading ? (
            <div className="flex-1 flex items-center justify-center text-[#946D6D] text-sm">
              Loading chat…
            </div>
          ) : error ? (
            <div className="flex-1 flex items-center justify-center text-rose-500 text-sm px-6 text-center">
              {error}
            </div>
          ) : (
            <>
              {showQuickMessages && (
                <div className="border-b border-[#E1B8A2] pb-2 pt-1">
                  <QuickMessages onSelect={handleQuickSelect} />
                </div>
              )}

              <ChatWindow
                conversation={conversation}
                messages={messages}
                isOnline={ownerOnline}
                lastSeen={ownerLastSeen}
                typingUser={typingUser}
                currentUser={user}
                onSend={handleSend}
                onTyping={handleTyping}
                onStopTyping={handleStopTyping}
                onMarkRead={handleMarkRead}
                isConnected={isConnected}
                prefillDraft={draft}
                onDraftConsumed={() => setDraft(null)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
