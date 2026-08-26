import React from "react";
import { FiCamera, FiEdit3, FiCheck } from "react-icons/fi";

export default function DesignModeSelector({ designMode, onSelectMode }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-[#6B6D43]">
          How would you like to design your cake?
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Whether you have a specific reference photo or want to build step-by-step from scratch.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <button
          type="button"
          onClick={() => onSelectMode("photo")}
          className={`p-5 rounded-3xl text-left border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-sm ${
            designMode === "photo"
              ? "border-[#CF7D65] bg-[#F2DEC7]/70 shadow-md ring-2 ring-[#CF7D65]/20"
              : "border-[#E1B8A2]/60 bg-white hover:border-[#CF7D65]/60 hover:bg-[#FDF4D2]/30"
          }`}
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF4D2] text-[#CF7D65] flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition">
                <FiCamera className="w-6 h-6" />
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition ${
                  designMode === "photo"
                    ? "border-[#CF7D65] bg-[#CF7D65] text-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {designMode === "photo" && (
                  <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                )}
              </div>
            </div>

            <div>
              <h4 className="text-base font-extrabold text-[#6B6D43]">
                I Have a Design / Photo
              </h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Upload your reference photo. Our head pastry chef will replicate the decoration while you customize the <strong>shape, size, flavor, filling & color</strong>.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#946D6D]/10">
            <span className="text-[11px] font-bold text-[#CF7D65] uppercase tracking-wider">
              ✓ Fast & Custom Reference
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelectMode("scratch")}
          className={`p-5 rounded-3xl text-left border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-sm ${
            designMode === "scratch"
              ? "border-[#CF7D65] bg-[#F2DEC7]/70 shadow-md ring-2 ring-[#CF7D65]/20"
              : "border-[#E1B8A2]/60 bg-white hover:border-[#CF7D65]/60 hover:bg-[#FDF4D2]/30"
          }`}
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF4D2] text-[#CF7D65] flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition">
                <FiEdit3 className="w-6 h-6" />
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition ${
                  designMode === "scratch"
                    ? "border-[#CF7D65] bg-[#CF7D65] text-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {designMode === "scratch" && (
                  <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                )}
              </div>
            </div>

            <div>
              <h4 className="text-base font-extrabold text-[#6B6D43]">
                Design from Scratch
              </h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Step-by-step interactive builder to customize the <strong>shape, size, sponge, fillings, colors, flowers, drips, and celebratory toppers</strong>.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#946D6D]/10">
            <span className="text-[11px] font-bold text-[#CF7D65] uppercase tracking-wider">
              ✓ Full Interactive Builder
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
