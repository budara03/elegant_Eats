import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ConversationItem from "./ConversationItem";

export default function ConversationList({
  conversations = [],
  activeId,
  onSelect,
  onlineCustomers = [],
}) {
  const [query, setQuery] = useState("");

  const totalUnread = conversations.reduce(
    (sum, c) => sum + (c.unreadCountOwner || 0),
    0
  );

  const filtered = conversations.filter((c) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (c.customerName || "").toLowerCase().includes(q) ||
      (c.lastMessage?.content || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col h-full border-r border-[#E1B8A2] bg-white">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-[#E1B8A2] flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[#6B6D43]">Messages</h2>
          {totalUnread > 0 && (
            <span className="bg-[#CF7D65] text-white text-xs font-bold rounded-full px-2 py-0.5">
              {totalUnread}
            </span>
          )}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-[#FDF4D2] border border-[#E1B8A2] rounded-2xl px-3 py-1.5">
          <FiSearch className="w-4 h-4 text-[#946D6D] flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations..."
            className="flex-1 bg-transparent text-sm text-[#6B6D43] placeholder-[#946D6D]/50 outline-none"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-[#946D6D] text-sm">
            {conversations.length === 0
              ? "No conversations yet"
              : "No results found"}
          </div>
        ) : (
          filtered.map((conv) => (
            <ConversationItem
              key={conv._id}
              conversation={conv}
              isActive={conv._id === activeId}
              onClick={() => onSelect(conv)}
              onlineCustomers={onlineCustomers}
            />
          ))
        )}
      </div>
    </div>
  );
}
