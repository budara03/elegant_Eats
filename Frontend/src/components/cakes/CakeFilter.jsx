import React from "react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import FlavorFilter from "./FlavorFilter";
import SizeFilter from "./SizeFilter";
import DietaryFilter from "./DietaryFilter";
import OccasionFilter from "./OccasionFilter";
import AvailabilityFilter from "./AvailabilityFilter";
import RatingFilter from "./RatingFilter";
import { FiRefreshCw, FiSliders } from "react-icons/fi";

export default function CakeFilter({
  selectedCategories = ["All"],
  onToggleCategory,
  maxPrice,
  onChangeMaxPrice,
  defaultMaxPrice = 15000,
  selectedFlavors = [],
  onToggleFlavor,
  selectedSizes = [],
  onToggleSize,
  selectedDietary = [],
  onToggleDietary,
  selectedOccasions = [],
  onToggleOccasion,
  selectedAvailability = [],
  onToggleAvailability,
  selectedRating = 0,
  onSelectRating,
  onClearFilters,
  activeFilterCount = 0,
}) {
  return (
    <aside className="w-full bg-white rounded-2xl border border-[#946D6D]/15 p-6 shadow-xs space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#946D6D]/10">
        <div>
          <div className="flex items-center gap-2">
            <FiSliders className="text-[#946D6D] w-4 h-4" />
            <h2 className="text-lg font-bold text-[#946D6D] tracking-wide">
              FILTERS
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {activeFilterCount > 0
              ? `${activeFilterCount} ${
                  activeFilterCount === 1 ? "filter" : "filters"
                } applied`
              : "Find your perfect cake"}
          </p>
        </div>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onClearFilters}
            className="flex items-center gap-1 text-xs font-semibold text-[#946D6D] hover:text-[#A290B7] transition"
            title="Reset all filters"
          >
            <FiRefreshCw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* 1. Category */}
      <CategoryFilter
        selectedCategories={selectedCategories}
        onToggleCategory={onToggleCategory}
      />

      <hr className="border-t border-[#946D6D]/10" />

      {/* 2. Price Range */}
      <PriceFilter
        maxPrice={maxPrice}
        onChangeMaxPrice={onChangeMaxPrice}
        min={1000}
        max={defaultMaxPrice}
        step={500}
      />

      <hr className="border-t border-[#946D6D]/10" />

      {/* 3. Flavor */}
      <FlavorFilter
        selectedFlavors={selectedFlavors}
        onToggleFlavor={onToggleFlavor}
      />

      <hr className="border-t border-[#946D6D]/10" />

      {/* 4. Cake Size */}
      <SizeFilter
        selectedSizes={selectedSizes}
        onToggleSize={onToggleSize}
      />

      <hr className="border-t border-[#946D6D]/10" />

      {/* 5. Dietary */}
      <DietaryFilter
        selectedDietary={selectedDietary}
        onToggleDietary={onToggleDietary}
      />

      <hr className="border-t border-[#946D6D]/10" />

      {/* 6. Occasion */}
      <OccasionFilter
        selectedOccasions={selectedOccasions}
        onToggleOccasion={onToggleOccasion}
      />

      <hr className="border-t border-[#946D6D]/10" />

      {/* 7. Availability */}
      <AvailabilityFilter
        selectedAvailability={selectedAvailability}
        onToggleAvailability={onToggleAvailability}
      />

      <hr className="border-t border-[#946D6D]/10" />

      {/* 8. Customer Rating */}
      <RatingFilter
        selectedRating={selectedRating}
        onSelectRating={onSelectRating}
      />

      <hr className="border-t border-[#946D6D]/10" />

      {/* Clear Filters CTA */}
      <button
        type="button"
        onClick={onClearFilters}
        className="w-full py-3 rounded-xl border border-[#946D6D] text-[#946D6D] font-bold text-sm hover:bg-[#946D6D] hover:text-white transition duration-200 shadow-xs flex items-center justify-center gap-2"
      >
        <FiRefreshCw className="w-4 h-4" />
        CLEAR FILTERS
      </button>
    </aside>
  );
}
