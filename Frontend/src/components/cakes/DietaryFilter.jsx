import React from "react";
import { FiCheck } from "react-icons/fi";

const dietaryOptions = ["Eggless", "Vegan", "Gluten-Free", "Nut-Free"];

export default function DietaryFilter({ selectedDietary = [], onToggleDietary }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-wider text-[#946D6D] uppercase">
          Dietary Preferences
        </h3>
        {selectedDietary.length > 0 && (
          <span className="text-[10px] bg-[#B0CDE6]/40 text-[#946D6D] px-1.5 py-0.5 rounded-full font-bold">
            {selectedDietary.length} selected
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        {dietaryOptions.map((opt) => {
          const isSelected = selectedDietary.includes(opt);

          return (
            <button
              type="button"
              key={opt}
              onClick={() => onToggleDietary(opt)}
              className="w-full flex items-center gap-3 py-1 text-left cursor-pointer group select-none text-sm focus:outline-none"
            >
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? "border-[#946D6D] bg-[#946D6D] text-white"
                    : "border-gray-300 group-hover:border-[#946D6D]/60 bg-white"
                }`}
              >
                {isSelected && <FiCheck className="text-xs stroke-[3]" />}
              </div>
              <span
                className={`transition-colors duration-200 ${
                  isSelected
                    ? "font-semibold text-[#946D6D]"
                    : "text-gray-600 group-hover:text-[#946D6D]"
                }`}
              >
                {opt}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
