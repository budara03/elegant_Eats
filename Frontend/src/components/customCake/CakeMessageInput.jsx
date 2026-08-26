import React from "react";
import { FiEdit3 } from "react-icons/fi";

export default function CakeMessageInput({ message, onChangeMessage, maxLength = 50 }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-[#6B6D43] flex items-center gap-1.5">
          <FiEdit3 className="w-4 h-4 text-[#CF7D65]" />
          Custom Message on Cake (Optional)
        </label>
        <span
          className={`text-xs font-mono font-semibold ${
            message.length >= maxLength ? "text-rose-500" : "text-gray-400"
          }`}
        >
          {message.length} / {maxLength} characters
        </span>
      </div>

      <input
        type="text"
        placeholder="e.g., Happy 25th Birthday Sarah!"
        value={message}
        onChange={(e) => onChangeMessage(e.target.value)}
        maxLength={maxLength}
        className="w-full px-4 py-3 rounded-2xl border-2 border-[#E1B8A2]/60 focus:border-[#CF7D65] bg-white text-sm text-[#6B6D43] placeholder-gray-400 focus:outline-none transition shadow-xs"
      />

      <p className="text-[11px] text-gray-500 italic">
        * Our pastry chefs will hand-pipe your greeting using edible chocolate or tinted royal icing.
      </p>
    </div>
  );
}
