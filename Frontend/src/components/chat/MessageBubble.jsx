import { FiCheck } from "react-icons/fi";

function formatTime(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function ReadStatus({ isRead, senderRole }) {
  // Only show read status for messages sent by the current user
  if (!isRead && isRead !== false) return null;

  if (isRead) {
    return (
      <span className="inline-flex items-center text-blue-300 ml-1" title="Read">
        <FiCheck className="w-3 h-3 -mr-1.5" />
        <FiCheck className="w-3 h-3" />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center text-white/50 ml-1" title="Sent">
      <FiCheck className="w-3 h-3" />
    </span>
  );
}

export default function MessageBubble({ message, isOwn }) {
  const { content, messageType, attachmentUrl, createdAt, isRead } = message;

  return (
    <div className={`flex mb-2 px-4 ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-xs sm:max-w-sm md:max-w-md rounded-2xl px-4 py-2.5
          ${isOwn
            ? "bg-[#CF7D65] text-white rounded-tr-sm"
            : "bg-[#F2DEC7] text-[#6B6D43] rounded-tl-sm"
          }
        `}
      >
        {/* Image attachment */}
        {messageType === "image" && attachmentUrl && (
          <div className="mb-2">
            <img
              src={attachmentUrl}
              alt="attachment"
              className="max-w-48 rounded-xl object-cover"
            />
          </div>
        )}

        {/* Text content */}
        {content && (
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </p>
        )}

        {/* Timestamp + read status */}
        <div
          className={`flex items-center justify-end gap-1 mt-1 ${
            isOwn ? "text-white/70" : "text-[#946D6D]"
          }`}
        >
          <span className="text-xs">{formatTime(createdAt)}</span>
          {isOwn && <ReadStatus isRead={isRead} />}
        </div>
      </div>
    </div>
  );
}
