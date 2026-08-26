import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

// GET /api/chat/conversation
// Customer: find or create their conversation. Admin: 403.
export const getOrCreateConversation = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Admins use the conversations list endpoint instead." });
    }

    // Find the first admin to act as owner
    const adminUser = await User.findOne({ role: "admin" });

    let conversation = await Conversation.findOne({ customer: req.user._id })
      .populate("customer", "name email role")
      .populate("owner", "name email role");

    if (!conversation) {
      conversation = new Conversation({
        customer: req.user._id,
        owner: adminUser ? adminUser._id : null,
      });
      await conversation.save();

      // Re-populate after save
      conversation = await Conversation.findById(conversation._id)
        .populate("customer", "name email role")
        .populate("owner", "name email role");
    }

    return res.status(200).json({ conversation });
  } catch (error) {
    console.error("getOrCreateConversation error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/chat/:conversationId/messages
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Only the customer of this conversation or any admin can read messages
    const isCustomer =
      conversation.customer.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isCustomer && !isAdmin) {
      return res.status(403).json({ message: "Access forbidden" });
    }

    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 })
      .populate("sender", "name role");

    return res.status(200).json({ messages });
  } catch (error) {
    console.error("getMessages error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST /api/chat/:conversationId/messages
export const sendMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { content, messageType, attachmentUrl, attachmentType } = req.body;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const senderRole = req.user.role === "admin" ? "owner" : "customer";

    const message = new Message({
      conversationId,
      sender: req.user._id,
      senderRole,
      messageType: messageType || "text",
      content: content || "",
      attachmentUrl: attachmentUrl || null,
      attachmentType: attachmentType || null,
    });

    await message.save();

    // Update conversation metadata
    conversation.lastMessage = content || "";
    conversation.lastMessageAt = new Date();

    // Increment unread count for the OTHER party
    if (senderRole === "customer") {
      conversation.unreadCountOwner += 1;
    } else {
      conversation.unreadCountCustomer += 1;
    }

    await conversation.save();

    return res.status(201).json({ message });
  } catch (error) {
    console.error("sendMessage error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/chat/owner/conversations  (admin only)
export const getOwnerConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({})
      .sort({ lastMessageAt: -1 })
      .populate("customer", "name email phone");

    return res.status(200).json({ conversations });
  } catch (error) {
    console.error("getOwnerConversations error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH /api/chat/:conversationId/read
export const markRead = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    if (req.user.role === "admin") {
      conversation.unreadCountOwner = 0;
      await conversation.save();

      // Mark all messages NOT sent by admin as read
      await Message.updateMany(
        { conversationId, sender: { $ne: req.user._id } },
        { isRead: true }
      );
    } else {
      conversation.unreadCountCustomer = 0;
      await conversation.save();

      // Mark all messages NOT sent by customer as read
      await Message.updateMany(
        { conversationId, sender: { $ne: req.user._id } },
        { isRead: true }
      );
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("markRead error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH /api/chat/:conversationId/resolve  (admin only)
export const resolveConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { status: "resolved" },
      { new: true }
    );

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    return res.status(200).json({ conversation });
  } catch (error) {
    console.error("resolveConversation error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
