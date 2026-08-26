import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    senderRole: { type: String, enum: ["customer", "owner"], required: true },
    messageType: { type: String, enum: ["text", "image", "file"], default: "text" },
    content: { type: String, default: "" },
    attachmentUrl: { type: String, default: null },
    attachmentType: { type: String, default: null },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
