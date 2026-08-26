import jwt from "jsonwebtoken";
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import User from "../models/User.js";

export default function initChatSocket(io) {
  // Map<userId(string), socketId(string)>
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    // ── Authentication / Guest handling ──────────────────────────────────────
    const token = socket.handshake.auth?.token;
    const isGuest = !token || token === "guest" || token.startsWith("guest_");

    if (isGuest) {
      const guestId = token && token.startsWith("guest_") ? token : `guest_${socket.id}`;
      socket.userId = guestId;
      socket.userRole = "customer";
      socket.isGuest = true;
      console.log(`Socket connected (guest): socketId=${socket.id} guestId=${guestId}`);
    } else {
      let decoded;
      try {
        const secret = (process.env.JWT_SECRET || "eleganteatssecretkey").trim().replace(/^"|"$/g, "");
        decoded = jwt.verify(token, secret);
        socket.userId = decoded.id;
        socket.userRole = decoded.role || "customer";
        socket.isGuest = false;

        onlineUsers.set(decoded.id, socket.id);
        io.emit("userOnline", { userId: decoded.id });
        console.log(`Socket connected (auth): userId=${decoded.id} socketId=${socket.id}`);
      } catch (err) {
        console.warn("Socket auth failed, falling back to guest:", err.message);
        socket.userId = `guest_${socket.id}`;
        socket.userRole = "customer";
        socket.isGuest = true;
      }
    }

    // ── joinConversation ─────────────────────────────────────────────────────
    socket.on("joinConversation", (data) => {
      const conversationId = typeof data === "object" ? data.conversationId : data;
      if (conversationId) {
        socket.join(conversationId);
        console.log(`Socket ${socket.id} (${socket.userId}) joined room ${conversationId}`);
      }
    });

    // ── sendMessage ──────────────────────────────────────────────────────────
    socket.on(
      "sendMessage",
      async ({ conversationId, content, messageType, attachmentUrl, attachmentType }) => {
        try {
          const senderRole = socket.userRole === "admin" ? "owner" : "customer";

          // If valid mongo conversation, save to db
          let message = null;
          try {
            const conversation = await Conversation.findById(conversationId);
            if (conversation) {
              message = new Message({
                conversationId,
                sender: socket.isGuest ? null : socket.userId,
                senderRole,
                messageType: messageType || "text",
                content: content || "",
                attachmentUrl: attachmentUrl || null,
                attachmentType: attachmentType || null,
              });
              await message.save();

              conversation.lastMessage = content || (messageType === "image" ? "📷 Image" : "");
              conversation.lastMessageAt = new Date();
              if (senderRole === "customer") {
                conversation.unreadCountOwner += 1;
              } else {
                conversation.unreadCountCustomer += 1;
              }
              await conversation.save();
            }
          } catch (dbErr) {
            console.warn("Could not persist message to MongoDB (e.g. guest or transient room):", dbErr.message);
          }

          const messagePayload = message ? message.toObject() : {
            _id: `msg_${Date.now()}`,
            conversationId,
            sender: { _id: socket.userId, name: socket.isGuest ? "Guest Customer" : "Customer" },
            senderRole,
            messageType: messageType || "text",
            content: content || "",
            attachmentUrl: attachmentUrl || null,
            attachmentType: attachmentType || null,
            createdAt: new Date().toISOString(),
            isRead: false,
          };

          // Emit to everyone in the room
          io.to(conversationId).emit("receiveMessage", messagePayload);

          // Notify all admin sockets about updated conversation
          for (const [uid, sid] of onlineUsers.entries()) {
            io.to(sid).emit("conversationUpdated", { conversationId, lastMessage: content });
          }
        } catch (err) {
          console.error("sendMessage socket error:", err);
        }
      }
    );

    // ── typing ───────────────────────────────────────────────────────────────
    socket.on("typing", (data) => {
      const conversationId = typeof data === "object" ? data.conversationId : data;
      if (conversationId) {
        socket.to(conversationId).emit("typing", { userId: socket.userId, conversationId });
      }
    });

    // ── stopTyping ───────────────────────────────────────────────────────────
    socket.on("stopTyping", (data) => {
      const conversationId = typeof data === "object" ? data.conversationId : data;
      if (conversationId) {
        socket.to(conversationId).emit("stopTyping", { userId: socket.userId, conversationId });
      }
    });

    // ── messageRead ──────────────────────────────────────────────────────────
    socket.on("messageRead", async (data) => {
      try {
        const conversationId = typeof data === "object" ? data.conversationId : data;
        if (conversationId) {
          try {
            await Message.updateMany(
              { conversationId, sender: { $ne: socket.userId }, isRead: false },
              { isRead: true }
            );
          } catch (_) {}
          io.to(conversationId).emit("messageRead", { conversationId, readBy: socket.userId });
        }
      } catch (err) {
        console.error("messageRead socket error:", err);
      }
    });

    // ── disconnect ───────────────────────────────────────────────────────────
    socket.on("disconnect", () => {
      if (!socket.isGuest) {
        onlineUsers.delete(socket.userId);
        io.emit("userOffline", { userId: socket.userId, lastSeen: new Date() });
      }
      console.log(`Socket disconnected: userId=${socket.userId}`);
    });
  });
}
