import React from "react";
import { cakeFillings } from "../../data/customCakeOptions";
import { FiCheck } from "react-icons/fi";

export default function CakeFillingSelector({ selectedFilling, onSelectFilling }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-[#6B6D43]">
          Choose Cake Filling
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Rich creams, ganaches, and fruit curds layered between sponge tiers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {cakeFillings.map((filling) => {
          const isSelected = selectedFilling?.id === filling.id;

          return (
            <button
              key={filling.id}
              type="button"
              onClick={() => onSelectFilling(filling)}
              className={`p-4 rounded-2xl text-left transition-all duration-200 border-2 flex items-start justify-between cursor-pointer group shadow-xs ${
                isSelected
                  ? "border-[#CF7D65] bg-[#F2DEC7]/60 shadow-md ring-2 ring-[#CF7D65]/20"
                  : "border-[#E1B8A2]/60 bg-white hover:border-[#CF7D65]/60 hover:bg-[#FDF4D2]/30"
              }`}
            >
              <div className="space-y-1 pr-2">
                <h4 className="text-sm font-bold text-[#6B6D43]">
                  {filling.name}
                </h4>
                <p className="text-xs text-gray-500 leading-snug">
                  {filling.description}
                </p>
                <span
                  className={`text-xs font-bold block pt-1 ${
                    filling.price > 0 ? "text-[#CF7D65]" : "text-emerald-700"
                  }`}
                >
                  {filling.price > 0
                    ? `+ Rs. ${filling.price.toLocaleString()}`
                    : "Included Free"}
                </span>
              </div>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 flex-shrink-0 mt-0.5 ${
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
