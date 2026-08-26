import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

function formatDateLabel(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (isSameDay(date, now)) return "Today";
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function groupMessagesByDate(messages) {
  const groups = [];
  let currentDate = null;
  let currentGroup = [];

  messages.forEach((msg) => {
    const msgDate = new Date(msg.createdAt).toDateString();
    if (msgDate !== currentDate) {
      if (currentGroup.length > 0) {
        groups.push({ date: currentDate, messages: currentGroup });
      }
      currentDate = msgDate;
      currentGroup = [msg];
    } else {
      currentGroup.push(msg);
    }
  });

  if (currentGroup.length > 0) {
    groups.push({ date: currentDate, messages: currentGroup });
  }

  return groups;
}

export default function MessageList({
  messages = [],
  currentUserId,
  currentUserRole,
  typingUser,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUser]);

  if (messages.length === 0 && !typingUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-center text-[#946D6D] text-sm px-6">
        No messages yet. Say hello! 👋
      </div>
    );
  }

  const groups = groupMessagesByDate(messages);

  return (
    <div className="flex-1 overflow-y-auto py-4">
      {groups.map((group) => (
        <div key={group.date}>
          {/* Date separator */}
          <div className="flex items-center gap-3 px-4 my-3">
            <div className="flex-1 h-px bg-[#E1B8A2]/50" />
            <span className="text-xs text-[#946D6D] font-medium px-2">
              {formatDateLabel(group.messages[0].createdAt)}
            </span>
            <div className="flex-1 h-px bg-[#E1B8A2]/50" />
          </div>

          {group.messages.map((msg) => {
            const isOwn =
              msg.sender?._id === currentUserId ||
              msg.sender === currentUserId ||
              msg.senderRole === currentUserRole;
            return (
              <MessageBubble key={msg._id || msg.tempId} message={msg} isOwn={isOwn} />
            );
          })}
        </div>
      ))}

      {typingUser && <TypingIndicator name={typingUser} />}
      <div ref={bottomRef} />
    </div>
  );
}
