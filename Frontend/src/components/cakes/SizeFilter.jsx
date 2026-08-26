import React from "react";
import { FiCheck } from "react-icons/fi";

const sizes = ["0.5 kg", "1 kg", "1.5 kg", "2 kg", "2.5 kg", "3 kg+"];

export default function SizeFilter({ selectedSizes = [], onToggleSize }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-wider text-[#946D6D] uppercase">
          Cake Size
        </h3>
        {selectedSizes.length > 0 && (
          <span className="text-[10px] bg-[#B0CDE6]/40 text-[#946D6D] px-1.5 py-0.5 rounded-full font-bold">
            {selectedSizes.length}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {sizes.map((size) => {
          const isSelected = selectedSizes.includes(size);

          return (
            <button
              type="button"
              key={size}
              onClick={() => onToggleSize(size)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer select-none transition-all duration-200 focus:outline-none ${
                isSelected
                  ? "border-[#946D6D] bg-[#946D6D] text-white font-semibold shadow-xs"
                  : "border-gray-200 bg-[#FDF4D2]/40 text-gray-700 hover:border-[#946D6D]/40"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                  isSelected
                    ? "border-white bg-white text-[#946D6D]"
                    : "border-gray-400 bg-white"
                }`}
              >
                {isSelected && <FiCheck className="text-[10px] stroke-[3]" />}
              </div>
              <span>{size}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
