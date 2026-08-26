import React from "react";
import { cakeSizes } from "../../data/customCakeOptions";
import { FiCheck, FiUsers } from "react-icons/fi";

export default function CakeSizeSelector({ selectedSize, onSelectSize }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-[#6B6D43]">
          Choose Cake Size & Weight
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Select the weight and portion size suited for your guest list.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {cakeSizes.map((size) => {
          const isSelected = selectedSize?.id === size.id;

          return (
            <button
              key={size.id}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`p-4 rounded-2xl text-left transition-all duration-200 border-2 flex flex-col justify-between cursor-pointer group shadow-xs ${
                isSelected
                  ? "border-[#CF7D65] bg-[#F2DEC7]/60 shadow-md ring-2 ring-[#CF7D65]/20"
                  : "border-[#E1B8A2]/60 bg-white hover:border-[#CF7D65]/60 hover:bg-[#FDF4D2]/30"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-base font-extrabold text-[#6B6D43] block">
                    {size.name}
                  </span>
                  <span className="text-xs text-gray-400 font-medium block">
                    {size.dimensions}
                  </span>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition ${
                    isSelected
                      ? "border-[#CF7D65] bg-[#CF7D65] text-white"
                      : "border-gray-300 bg-white group-hover:border-[#CF7D65]"
                  }`}
                >
                  {isSelected && <FiCheck className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-[#946D6D]/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                  <FiUsers className="w-3.5 h-3.5 text-[#CF7D65]" />
                  {size.servings}
                </span>
                <span className="text-sm font-bold text-[#CF7D65]">
                  Rs. {size.price.toLocaleString()}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
