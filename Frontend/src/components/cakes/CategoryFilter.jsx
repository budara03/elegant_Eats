import React from "react";
import { FiCheck } from "react-icons/fi";

const categories = [
  "All Cakes",
  "Birthday Cakes",
  "Wedding Cakes",
  "Anniversary Cakes",
  "Custom Cakes",
  "Kids Cakes",
  "Cupcakes",
  "Cheesecakes",
  "Party Desserts",
];

export default function CategoryFilter({
  selectedCategories = ["All"],
  onToggleCategory,
}) {
  const isAllSelected =
    selectedCategories.length === 0 || selectedCategories.includes("All");

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-wider text-[#946D6D] uppercase">
          Category
        </h3>
        <span className="text-[10px] text-gray-400 font-medium">Multi-select</span>
      </div>

      <div className="space-y-1.5">
        {categories.map((cat) => {
          const isAll = cat === "All Cakes";
          const isSelected = isAll
            ? isAllSelected
            : selectedCategories.includes(cat);

          return (
            <button
              type="button"
              key={cat}
              onClick={() => onToggleCategory(isAll ? "All" : cat)}
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
                {cat}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
