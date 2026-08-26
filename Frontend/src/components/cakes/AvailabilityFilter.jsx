import React from "react";
import { FiCheck } from "react-icons/fi";

const availabilityOptions = ["In Stock", "Pre-Order", "Custom Order Available"];

export default function AvailabilityFilter({
  selectedAvailability = [],
  onToggleAvailability,
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-wider text-[#946D6D] uppercase">
          Availability
        </h3>
        {selectedAvailability.length > 0 && (
          <span className="text-[10px] bg-[#B0CDE6]/40 text-[#946D6D] px-1.5 py-0.5 rounded-full font-bold">
            {selectedAvailability.length}
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        {availabilityOptions.map((opt) => {
          const isSelected = selectedAvailability.includes(opt);

          return (
            <button
              type="button"
              key={opt}
              onClick={() => onToggleAvailability(opt)}
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
