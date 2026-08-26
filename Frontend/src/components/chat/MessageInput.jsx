import { useState, useRef, useCallback } from "react";
import { FiSend, FiSmile } from "react-icons/fi";
import AttachmentButton from "./AttachmentButton";

const STOP_TYPING_DELAY = 1500;

export default function MessageInput({
  onSend,
  onTyping,
  onStopTyping,
  disabled,
  externalDraft,
  onDraftConsumed,
}) {
  const [text, setText] = useState(externalDraft || "");
  const [attachment, setAttachment] = useState(null);
  const stopTypingTimer = useRef(null);
  const textareaRef = useRef(null);

  // Consume external draft (prefilled message from navigation state)
  if (externalDraft && text !== externalDraft) {
    setText(externalDraft);
    if (onDraftConsumed) onDraftConsumed();
  }

  const handleTyping = useCallback(
    (value) => {
      setText(value);
      if (onTyping) onTyping();
      if (stopTypingTimer.current) clearTimeout(stopTypingTimer.current);
      stopTypingTimer.current = setTimeout(() => {
        if (onStopTyping) onStopTyping();
      }, STOP_TYPING_DELAY);
    },
    [onTyping, onStopTyping]
  );

  const handleSend = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed && !attachment) return;

    onSend({
      content: trimmed,
      messageType: attachment ? "image" : "text",
      attachmentUrl: attachment?.dataUrl || null,
    });

    setText("");
    setAttachment(null);
    if (stopTypingTimer.current) clearTimeout(stopTypingTimer.current);
    if (onStopTyping) onStopTyping();

    // Auto-resize reset
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [text, attachment, onSend, onStopTyping]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e) => {
    handleTyping(e.target.value);
    // Auto-grow
    const ta = e.target;
    ta.style.height = "auto";
    const maxHeight = 4 * 24; // ~4 rows
    ta.style.height = Math.min(ta.scrollHeight, maxHeight) + "px";
  };

  const canSend = text.trim().length > 0 || attachment !== null;

  return (
    <div className="bg-white border-t border-[#E1B8A2] px-3 py-3 flex-shrink-0">
      {/* Attachment preview strip */}
      {attachment && (
        <div className="mb-2 flex items-center gap-2">
          <div className="relative inline-block">
            <img
              src={attachment.dataUrl}
              alt="preview"
              className="h-16 w-16 rounded-xl object-cover border border-[#E1B8A2]"
            />
            <button
              type="button"
              onClick={() => setAttachment(null)}
              className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none"
              aria-label="Remove attachment"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="flex items-end gap-2">
        {/* Attachment button */}
        <AttachmentButton onFileSelect={setAttachment} />

        {/* Emoji placeholder */}
        <button
          type="button"
          className="text-[#946D6D] hover:text-[#CF7D65] transition p-1"
          title="Emoji (coming soon)"
        >
          <FiSmile className="w-5 h-5" />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Type your message..."
          className="flex-1 resize-none border-2 border-[#E1B8A2] focus:border-[#CF7D65] rounded-2xl px-4 py-2 text-sm text-[#6B6D43] placeholder-[#946D6D]/50 outline-none transition overflow-hidden disabled:opacity-50"
          style={{ minHeight: "40px", maxHeight: "96px" }}
        />

        {/* Send button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend || disabled}
          className="bg-[#CF7D65] hover:bg-[#6B6D43] text-white rounded-2xl p-2.5 transition disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          aria-label="Send message"
        >
          <FiSend className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
