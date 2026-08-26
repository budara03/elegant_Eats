import React from "react";

export default function PriceFilter({
  maxPrice,
  onChangeMaxPrice,
  min = 1000,
  max = 15000,
  step = 500,
}) {
  const formattedPrice = Number(maxPrice).toLocaleString("en-LK");

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-wider text-[#946D6D] uppercase">
          Price Range
        </h3>
        <span className="text-xs font-bold text-[#946D6D] bg-[#B0CDE6]/30 px-2 py-0.5 rounded-full">
          Max: Rs. {formattedPrice}
        </span>
      </div>

      <div className="space-y-2 pt-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxPrice}
          onChange={(e) => onChangeMaxPrice(Number(e.target.value))}
          className="w-full h-2 bg-[#FDF4D2] rounded-lg appearance-none cursor-pointer accent-[#946D6D] focus:outline-none"
        />

        <div className="flex justify-between text-xs text-gray-500 font-medium">
          <span>Rs. {min.toLocaleString()}</span>
          <span>Rs. {max.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
