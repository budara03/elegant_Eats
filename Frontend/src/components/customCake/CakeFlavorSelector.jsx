import React from "react";
import { cakeFlavors } from "../../data/customCakeOptions";
import { FiCheck } from "react-icons/fi";

export default function CakeFlavorSelector({ selectedFlavor, onSelectFlavor }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-[#6B6D43]">
          Select Sponge Flavor
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Handcrafted sponge recipes baked fresh from scratch.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {cakeFlavors.map((flavor) => {
          const isSelected = selectedFlavor?.id === flavor.id;

          return (
            <button
              key={flavor.id}
              type="button"
              onClick={() => onSelectFlavor(flavor)}
              className={`p-3.5 rounded-2xl text-left transition-all duration-200 border-2 flex items-start gap-3 cursor-pointer group shadow-xs ${
                isSelected
                  ? "border-[#CF7D65] bg-[#F2DEC7]/60 shadow-md ring-2 ring-[#CF7D65]/20"
                  : "border-[#E1B8A2]/60 bg-white hover:border-[#CF7D65]/60 hover:bg-[#FDF4D2]/30"
              }`}
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden relative flex-shrink-0 bg-[#FDF4D2] shadow-xs">
                <img
                  src={flavor.image}
                  alt={flavor.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition duration-300"
                />
                <span className="absolute bottom-0.5 right-0.5 text-xs">
                  {flavor.emoji}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-[#6B6D43] truncate pr-1">
                    {flavor.name}
                  </h4>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                      isSelected
                        ? "border-[#CF7D65] bg-[#CF7D65] text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && <FiCheck className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                  {flavor.description}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      flavor.price > 0 ? "text-[#CF7D65]" : "text-emerald-700"
                    }`}
                  >
                    {flavor.price > 0
                      ? `+ Rs. ${flavor.price.toLocaleString()}`
                      : "Included Free"}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
