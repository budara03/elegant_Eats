import React from "react";
import { FaStar } from "react-icons/fa";

const ratingOptions = [
  { label: "All Ratings", value: 0 },
  { label: "5.0 only", stars: 5, value: 5.0 },
  { label: "4.0 & above", stars: 4, value: 4.0 },
  { label: "3.0 & above", stars: 3, value: 3.0 },
];

export default function RatingFilter({ selectedRating = 0, onSelectRating }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold tracking-wider text-[#946D6D] uppercase">
        Customer Rating
      </h3>
      <div className="space-y-1.5">
        {ratingOptions.map((opt) => {
          const isSelected = selectedRating === opt.value;

          return (
            <button
              type="button"
              key={opt.label}
              onClick={() => onSelectRating(opt.value)}
              className="w-full flex items-center gap-3 py-1 text-left cursor-pointer group select-none text-sm focus:outline-none"
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? "border-[#946D6D] bg-[#946D6D]"
                    : "border-gray-300 group-hover:border-[#946D6D]/60 bg-white"
                }`}
              >
                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>

              <div className="flex items-center gap-1.5">
                {opt.stars ? (
                  <>
                    <div className="flex text-amber-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < opt.stars ? "text-amber-400" : "text-gray-200"}
                        />
                      ))}
                    </div>
                    <span
                      className={`text-xs ${
                        isSelected
                          ? "font-semibold text-[#946D6D]"
                          : "text-gray-600 group-hover:text-[#946D6D]"
                      }`}
                    >
                      {opt.label}
                    </span>
                  </>
                ) : (
                  <span
                    className={`text-sm ${
                      isSelected
                        ? "font-semibold text-[#946D6D]"
                        : "text-gray-600 group-hover:text-[#946D6D]"
                    }`}
                  >
                    {opt.label}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
