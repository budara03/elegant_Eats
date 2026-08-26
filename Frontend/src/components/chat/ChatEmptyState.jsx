export default function ChatEmptyState({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 text-center py-16">
      <div className="text-6xl mb-4">💬</div>
      <h2 className="text-2xl font-bold text-[#6B6D43] mb-2">Need help?</h2>
      <p className="text-[#946D6D] text-sm mb-8 max-w-xs">
        Chat with our team for custom cake inquiries, order updates, pricing, or
        anything else. We'd love to hear from you!
      </p>
      <button
        type="button"
        onClick={onStart}
        className="bg-[#CF7D65] hover:bg-[#6B6D43] text-white font-bold px-8 py-3 rounded-2xl shadow-md transition"
      >
        Start Conversation
      </button>
    </div>
  );
}
