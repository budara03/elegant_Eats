import React from "react";
import { FiCheck } from "react-icons/fi";

const scratchSteps = [
  { number: 1, title: "Shape" },
  { number: 2, title: "Size" },
  { number: 3, title: "Flavor" },
  { number: 4, title: "Filling" },
  { number: 5, title: "Color" },
  { number: 6, title: "Decor" },
  { number: 7, title: "Message" },
  { number: 8, title: "Review" },
];

const photoSteps = [
  { number: 1, title: "Design Photo" },
  { number: 2, title: "Shape" },
  { number: 3, title: "Size" },
  { number: 4, title: "Flavor" },
  { number: 5, title: "Filling" },
  { number: 6, title: "Color" },
  { number: 7, title: "Message" },
  { number: 8, title: "Review" },
];

export default function BuilderProgress({
  currentStep,
  onStepClick,
  maxStepReached = 1,
  designMode = "scratch",
}) {
  const steps = designMode === "photo" ? photoSteps : scratchSteps;

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#946D6D]/15 mb-6">
      <div className="hidden md:flex items-center justify-between relative">
        <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-[#FDF4D2] z-0" />
        <div
          className="absolute top-1/2 left-6 -translate-y-1/2 h-1 bg-[#CF7D65] transition-all duration-500 z-0"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isClickable = step.number <= maxStepReached;

          return (
            <button
              key={step.number}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick(step.number)}
              className={`relative z-10 flex flex-col items-center group transition focus:outline-none ${
                isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-60"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 shadow-xs ${
                  isCompleted
                    ? "bg-[#6B6D43] text-white"
                    : isCurrent
                    ? "bg-[#CF7D65] text-white ring-4 ring-[#CF7D65]/20 scale-110"
                    : "bg-white text-gray-400 border-2 border-[#E1B8A2]"
                }`}
              >
                {isCompleted ? <FiCheck className="w-3.5 h-3.5 stroke-[3]" /> : step.number}
              </div>

              <span
                className={`text-[10px] font-bold mt-1.5 transition text-center truncate max-w-[70px] ${
                  isCurrent
                    ? "text-[#CF7D65]"
                    : isCompleted
                    ? "text-[#6B6D43]"
                    : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex md:hidden items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#CF7D65]">
            Step {currentStep} of {steps.length}
          </span>
          <h3 className="text-sm font-bold text-[#6B6D43]">
            {steps[currentStep - 1]?.title} Selection
          </h3>
        </div>

        <div className="flex items-center gap-1">
          {steps.map((s) => (
            <div
              key={s.number}
              className={`h-2 rounded-full transition-all duration-300 ${
                s.number === currentStep
                  ? "w-5 bg-[#CF7D65]"
                  : s.number < currentStep
                  ? "w-2 bg-[#6B6D43]"
                  : "w-1.5 bg-[#E1B8A2]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
