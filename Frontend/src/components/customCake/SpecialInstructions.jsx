import React from "react";
import { FiMessageSquare } from "react-icons/fi";

export default function SpecialInstructions({
  instructions,
  onChangeInstructions,
}) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-bold text-[#6B6D43] flex items-center gap-1.5">
        <FiMessageSquare className="w-4 h-4 text-[#CF7D65]" />
        Special Chef Instructions (Optional)
      </label>

      <textarea
        placeholder="e.g., Please make the floral tones soft blush pink, keep the sweetness light, or omit nuts completely..."
        value={instructions}
        onChange={(e) => onChangeInstructions(e.target.value)}
        rows={3}
        className="w-full px-4 py-3 rounded-2xl border-2 border-[#E1B8A2]/60 focus:border-[#CF7D65] bg-white text-xs sm:text-sm text-[#6B6D43] placeholder-gray-400 focus:outline-none transition shadow-xs resize-none"
      />
    </div>
  );
}
