import express from "express";
import {
  getOrCreateConversation,
  getMessages,
  sendMessage,
  getOwnerConversations,
  markRead,
  resolveConversation,
} from "../controllers/chatController.js";
import { authenticateToken, authorizeRole } from "../middleware/addMiddleware.js";

const chatRouter = express.Router();

// Customer routes
chatRouter.get("/conversation", authenticateToken, getOrCreateConversation);
chatRouter.get("/:conversationId/messages", authenticateToken, getMessages);
chatRouter.post("/:conversationId/messages", authenticateToken, sendMessage);
chatRouter.patch("/:conversationId/read", authenticateToken, markRead);

// Owner/admin routes
chatRouter.get("/owner/conversations", authenticateToken, authorizeRole(["admin"]), getOwnerConversations);
chatRouter.patch("/:conversationId/resolve", authenticateToken, authorizeRole(["admin"]), resolveConversation);

export default chatRouter;
