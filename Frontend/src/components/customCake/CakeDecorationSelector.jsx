import React from "react";
import { cakeDecorations } from "../../data/customCakeOptions";
import { FiCheck } from "react-icons/fi";

export default function CakeDecorationSelector({
  selectedDecorations = [],
  onToggleDecoration,
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-[#6B6D43]">
          Choose Cake Decorations & Toppings
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Select multiple decorative accents (toppers, floral arrangements, drips, and pearls).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {cakeDecorations.map((decor) => {
          const isSelected = selectedDecorations.some((d) => d.id === decor.id);

          return (
            <button
              key={decor.id}
              type="button"
              onClick={() => onToggleDecoration(decor)}
              className={`p-3.5 rounded-2xl text-left transition-all duration-200 border-2 flex items-start justify-between cursor-pointer group shadow-xs ${
                isSelected
                  ? "border-[#CF7D65] bg-[#F2DEC7]/60 shadow-md ring-2 ring-[#CF7D65]/20"
                  : "border-[#E1B8A2]/60 bg-white hover:border-[#CF7D65]/60 hover:bg-[#FDF4D2]/30"
              }`}
            >
              <div className="flex items-start gap-3 pr-2">
                <span className="text-2xl p-2 rounded-xl bg-[#FDF4D2] flex-shrink-0">
                  {decor.emoji}
                </span>

                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-[#6B6D43]">
                    {decor.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 line-clamp-1">
                    {decor.description}
                  </p>
                  <span className="text-xs font-bold text-[#CF7D65] block pt-0.5">
                    + Rs. {decor.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 flex-shrink-0 mt-0.5 transition ${
                  isSelected
                    ? "border-[#CF7D65] bg-[#CF7D65] text-white"
                    : "border-gray-300 bg-white group-hover:border-[#CF7D65]"
                }`}
              >
                {isSelected && <FiCheck className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
