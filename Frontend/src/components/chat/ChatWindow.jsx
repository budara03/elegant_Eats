import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatWindow({
  conversation,
  messages = [],
  isOnline,
  lastSeen,
  typingUser,
  currentUser,
  onSend,
  onTyping,
  onStopTyping,
  onBack,
  onMarkRead,
  isConnected,
  prefillDraft,
  onDraftConsumed,
}) {
  useEffect(() => {
    if (conversation?._id && onMarkRead) {
      onMarkRead(conversation._id);
    }
  }, [conversation?._id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Connection lost banner */}
      {isConnected === false && (
        <div className="flex-shrink-0 bg-amber-50 border-b border-amber-300 text-amber-700 text-xs font-medium px-4 py-2 text-center">
          ⚠️ Connection lost — Trying to reconnect...
        </div>
      )}

      {/* Header */}
      <ChatHeader
        isOnline={isOnline}
        lastSeen={lastSeen}
        onBack={onBack}
        title={conversation?.title || "Elegant Eats"}
      />

      {/* Messages */}
      <MessageList
        messages={messages}
        currentUserId={currentUser?._id}
        currentUserRole={currentUser?.role}
        typingUser={typingUser}
      />

      {/* Input */}
      <MessageInput
        onSend={onSend}
        onTyping={onTyping}
        onStopTyping={onStopTyping}
        externalDraft={prefillDraft}
        onDraftConsumed={onDraftConsumed}
      />
    </div>
  );
}
