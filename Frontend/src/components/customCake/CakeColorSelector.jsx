import React, { useState } from "react";
import { cakeColors } from "../../data/customCakeOptions";
import { FiCheck } from "react-icons/fi";

export default function CakeColorSelector({ selectedColor, onSelectColor }) {
  const [customHex, setCustomHex] = useState("#F7A8B8");

  const handleCustomColorChange = (e) => {
    const hex = e.target.value;
    setCustomHex(hex);
    onSelectColor({
      id: "custom",
      name: `Custom (${hex.toUpperCase()})`,
      hex,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-[#6B6D43]">
          Choose Cake Color & Theme
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Pick your celebration theme frosting or enter a custom color shade.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        {cakeColors.map((col) => {
          const isSelected = selectedColor?.id === col.id;

          return (
            <button
              key={col.id}
              type="button"
              onClick={() => onSelectColor(col)}
              className={`p-3 rounded-2xl text-left transition-all duration-200 border-2 flex items-center gap-3 cursor-pointer group shadow-xs ${
                isSelected
                  ? "border-[#CF7D65] bg-[#F2DEC7]/60 shadow-md ring-2 ring-[#CF7D65]/20"
                  : "border-[#E1B8A2]/60 bg-white hover:border-[#CF7D65]/60 hover:bg-[#FDF4D2]/30"
              }`}
            >
              <div
                className="w-8 h-8 rounded-full shadow-inner border border-black/15 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: col.hex }}
              >
                {isSelected && (
                  <FiCheck
                    className={`w-4 h-4 stroke-[3] ${
                      col.textDark ? "text-gray-800" : "text-white"
                    }`}
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-[#6B6D43] block truncate">
                  {col.name}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  {col.hex}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-4 rounded-2xl bg-[#FDF4D2]/40 border border-[#946D6D]/15 flex items-center justify-between gap-4 mt-4">
        <div>
          <h4 className="text-xs font-bold text-[#6B6D43]">
            Custom Hex Color Shade
          </h4>
          <p className="text-[11px] text-gray-500">
            Have an exact theme palette? Use the color picker.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="color"
            value={selectedColor?.id === "custom" ? selectedColor.hex : customHex}
            onChange={handleCustomColorChange}
            className="w-10 h-10 rounded-xl cursor-pointer border border-gray-300 p-0.5 bg-white"
          />
          <span className="text-xs font-mono font-bold text-[#CF7D65]">
            {selectedColor?.id === "custom"
              ? selectedColor.hex.toUpperCase()
              : "Pick Color"}
          </span>
        </div>
      </div>
    </div>
  );
}
