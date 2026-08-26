import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lastMessage: { type: String, default: "" },
    lastMessageAt: { type: Date, default: Date.now },
    unreadCountCustomer: { type: Number, default: 0 },
    unreadCountOwner: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "resolved", "archived"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
