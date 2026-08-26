const QUICK_MESSAGES = [
  "🎂 Custom Cake Inquiry",
  "🔍 Check Cake Availability",
  "🚚 Ask About Delivery",
  "💰 Ask About Pricing",
  "📦 Order Question",
];

export default function QuickMessages({ onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-3 pt-1">
      {QUICK_MESSAGES.map((msg) => (
        <button
          key={msg}
          type="button"
          onClick={() => onSelect(msg)}
          className="text-xs text-[#6B6D43] border border-[#E1B8A2] bg-white hover:bg-[#F2DEC7] rounded-full px-3 py-1.5 transition cursor-pointer"
        >
          {msg}
        </button>
      ))}
    </div>
  );
}
