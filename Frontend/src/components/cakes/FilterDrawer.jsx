import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiRefreshCw } from "react-icons/fi";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import FlavorFilter from "./FlavorFilter";
import SizeFilter from "./SizeFilter";
import DietaryFilter from "./DietaryFilter";
import OccasionFilter from "./OccasionFilter";
import AvailabilityFilter from "./AvailabilityFilter";
import RatingFilter from "./RatingFilter";

export default function FilterDrawer({
  isOpen,
  onClose,
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
  matchedCakeCount = 0,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#946D6D]/15 flex items-center justify-between bg-[#FDF4D2]/40">
              <div>
                <h2 className="text-lg font-bold text-[#946D6D]">Filters</h2>
                <p className="text-xs text-gray-500">
                  {activeFilterCount > 0
                    ? `${activeFilterCount} filters applied`
                    : "Refine your selection"}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-gray-600 hover:text-[#946D6D] hover:bg-[#946D6D]/10 transition"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <CategoryFilter
                selectedCategories={selectedCategories}
                onToggleCategory={onToggleCategory}
              />

              <hr className="border-t border-[#946D6D]/10" />

              <PriceFilter
                maxPrice={maxPrice}
                onChangeMaxPrice={onChangeMaxPrice}
                min={1000}
                max={defaultMaxPrice}
                step={500}
              />

              <hr className="border-t border-[#946D6D]/10" />

              <FlavorFilter
                selectedFlavors={selectedFlavors}
                onToggleFlavor={onToggleFlavor}
              />

              <hr className="border-t border-[#946D6D]/10" />

              <SizeFilter
                selectedSizes={selectedSizes}
                onToggleSize={onToggleSize}
              />

              <hr className="border-t border-[#946D6D]/10" />

              <DietaryFilter
                selectedDietary={selectedDietary}
                onToggleDietary={onToggleDietary}
              />

              <hr className="border-t border-[#946D6D]/10" />

              <OccasionFilter
                selectedOccasions={selectedOccasions}
                onToggleOccasion={onToggleOccasion}
              />

              <hr className="border-t border-[#946D6D]/10" />

              <AvailabilityFilter
                selectedAvailability={selectedAvailability}
                onToggleAvailability={onToggleAvailability}
              />

              <hr className="border-t border-[#946D6D]/10" />

              <RatingFilter
                selectedRating={selectedRating}
                onSelectRating={onSelectRating}
              />
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-[#946D6D]/15 bg-[#FDF4D2]/40 flex gap-3">
              <button
                type="button"
                onClick={onClearFilters}
                className="px-4 py-3 rounded-xl border border-[#946D6D]/30 text-[#946D6D] font-bold text-sm hover:bg-[#946D6D]/10 transition flex items-center justify-center gap-1.5"
              >
                <FiRefreshCw className="w-3.5 h-3.5" />
                Clear
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-[#946D6D] hover:bg-[#7e5b5b] text-white font-bold text-sm shadow-md transition text-center"
              >
                Apply Filters ({matchedCakeCount})
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
