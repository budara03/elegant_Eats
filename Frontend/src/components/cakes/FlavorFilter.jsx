import React from "react";
import { FiCheck } from "react-icons/fi";

const flavors = [
  "Chocolate",
  "Vanilla",
  "Strawberry",
  "Red Velvet",
  "Butterscotch",
  "Coffee",
  "Fruit",
];

export default function FlavorFilter({ selectedFlavors = [], onToggleFlavor }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-wider text-[#946D6D] uppercase">
          Flavor
        </h3>
        {selectedFlavors.length > 0 && (
          <span className="text-[10px] bg-[#B0CDE6]/40 text-[#946D6D] px-1.5 py-0.5 rounded-full font-bold">
            {selectedFlavors.length} selected
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        {flavors.map((flavor) => {
          const isSelected = selectedFlavors.includes(flavor);

          return (
            <button
              type="button"
              key={flavor}
              onClick={() => onToggleFlavor(flavor)}
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
                {flavor}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
