import React from "react";
import { FiX } from "react-icons/fi";

export default function ActiveFilterChips({
  selectedCategories = ["All"],
  maxPrice,
  defaultMaxPrice = 15000,
  selectedFlavors = [],
  selectedSizes = [],
  selectedDietary = [],
  selectedOccasions = [],
  selectedAvailability = [],
  selectedRating = 0,
  onRemoveCategory,
  onResetMaxPrice,
  onRemoveFlavor,
  onRemoveSize,
  onRemoveDietary,
  onRemoveOccasion,
  onRemoveAvailability,
  onResetRating,
  onClearAll,
}) {
  const chips = [];

  // Multi categories
  const activeCategories = selectedCategories.filter(
    (c) => c !== "All" && c !== "All Cakes"
  );
  activeCategories.forEach((cat) => {
    chips.push({
      id: `category-${cat}`,
      label: cat,
      onRemove: () => onRemoveCategory(cat),
    });
  });

  if (maxPrice < defaultMaxPrice) {
    chips.push({
      id: "price",
      label: `Max: Rs. ${Number(maxPrice).toLocaleString()}`,
      onRemove: onResetMaxPrice,
    });
  }

  selectedFlavors.forEach((flavor) => {
    chips.push({
      id: `flavor-${flavor}`,
      label: flavor,
      onRemove: () => onRemoveFlavor(flavor),
    });
  });

  selectedSizes.forEach((size) => {
    chips.push({
      id: `size-${size}`,
      label: size,
      onRemove: () => onRemoveSize(size),
    });
  });

  selectedDietary.forEach((diet) => {
    chips.push({
      id: `diet-${diet}`,
      label: diet,
      onRemove: () => onRemoveDietary(diet),
    });
  });

  selectedOccasions.forEach((occ) => {
    chips.push({
      id: `occ-${occ}`,
      label: occ,
      onRemove: () => onRemoveOccasion(occ),
    });
  });

  selectedAvailability.forEach((avail) => {
    chips.push({
      id: `avail-${avail}`,
      label: avail,
      onRemove: () => onRemoveAvailability(avail),
    });
  });

  if (selectedRating > 0) {
    chips.push({
      id: "rating",
      label: `${selectedRating}★ & above`,
      onRemove: onResetRating,
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 pb-4">
      <span className="text-xs font-semibold text-gray-500 mr-1">
        Active Filters:
      </span>

      {chips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FDF4D2] text-[#946D6D] border border-[#946D6D]/20 shadow-xs"
        >
          {chip.label}
          <button
            type="button"
            onClick={chip.onRemove}
            className="hover:text-[#A290B7] hover:bg-[#946D6D]/10 rounded-full p-0.5 transition"
          >
            <FiX className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="text-xs font-bold text-[#946D6D] hover:text-[#A290B7] underline ml-2 transition"
      >
        Clear All
      </button>
    </div>
  );
}
