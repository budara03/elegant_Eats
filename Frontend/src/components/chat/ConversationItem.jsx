function formatTime(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h`;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function ConversationItem({
  conversation,
  isActive,
  onClick,
  onlineCustomers = [],
}) {
  const { _id, customerName, lastMessage, unreadCountOwner, updatedAt } =
    conversation;

  const initial = (customerName || "U").charAt(0).toUpperCase();
  const isOnline = onlineCustomers.includes(_id);
  const hasUnread = unreadCountOwner > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3 text-left transition
        ${isActive
          ? "bg-[#F2DEC7] border-l-4 border-[#CF7D65]"
          : hasUnread
          ? "bg-[#FDF4D2] hover:bg-[#F2DEC7]/60"
          : "hover:bg-gray-50"
        }
      `}
    >
      {/* Avatar with online indicator */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#99B4AA] text-white flex items-center justify-center font-bold text-sm">
          {initial}
        </div>
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
        )}
      </div>

      {/* Name + last message */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span
            className={`text-sm truncate ${
              hasUnread ? "font-bold text-[#6B6D43]" : "font-medium text-[#6B6D43]"
            }`}
          >
            {customerName || "Customer"}
          </span>
          <span className="text-xs text-[#946D6D] flex-shrink-0 ml-2">
            {formatTime(updatedAt || lastMessage?.createdAt)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-xs text-gray-500 truncate leading-tight max-w-[160px]">
            {lastMessage?.content || "No messages yet"}
          </p>
          {hasUnread && (
            <span className="ml-2 flex-shrink-0 bg-[#CF7D65] text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-bold">
              {unreadCountOwner > 99 ? "99+" : unreadCountOwner}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
