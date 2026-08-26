import React from "react";
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";

export default function CakePreview({ cake, totalPrice, designMode = "scratch" }) {
  const {
    shape,
    size,
    flavor,
    filling,
    color,
    decorations = [],
    message = "",
    inspirationImage = null,
  } = cake;

  const cakeColorHex = color?.hex || "#F2DEC7";
  const isMultiTier = size?.id === "two" || size?.id === "three" || shape?.id === "tall-cylinder";
  const isTripleTier = size?.id === "three";

  const getShapeClasses = () => {
    switch (shape?.id) {
      case "heart":
        return "rounded-t-[40px]";
      case "square":
        return "rounded-t-none rounded-b-xs";
      case "rectangle":
        return "w-56 sm:w-64 rounded-t-xs";
      case "number-letter":
        return "rounded-t-2xl";
      case "tall-cylinder":
        return "rounded-t-xl";
      default:
        return "rounded-t-2xl";
    }
  };

  const hasFlowers = decorations.some((d) => d.id === "fresh-flowers");
  const hasDrip = decorations.some((d) => d.id === "chocolate-drip");
  const hasSprinkles = decorations.some((d) => d.id === "sprinkles");
  const hasPearls = decorations.some((d) => d.id === "edible-pearls");
  const hasGold = decorations.some((d) => d.id === "gold-details");
  const hasBirthdayTopper = decorations.some((d) => d.id === "birthday-topper");
  const hasWeddingTopper = decorations.some((d) => d.id === "wedding-topper");
  const hasFruit = decorations.some((d) => d.id === "fruit-toppings");
  const hasMacarons = decorations.some((d) => d.id === "macarons");

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-[#946D6D]/15 flex flex-col justify-between sticky top-28">
      <div className="flex justify-between items-center pb-4 border-b border-[#946D6D]/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#FDF4D2] flex items-center justify-center text-[#CF7D65]">
            <FiAward className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#6B6D43]">
              Live Cake Preview
            </h3>
            <span className="text-[11px] text-gray-400 font-medium">
              {designMode === "photo"
                ? "Custom Photo Reference Mode"
                : "Synchronized Real-Time Design"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {shape && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FDF4D2] text-[#6B6D43] border border-[#6B6D43]/20">
              {shape.emoji} {shape.name}
            </span>
          )}
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F2DEC7] text-[#CF7D65] border border-[#CF7D65]/20">
            {size?.name || "1 kg"}
          </span>
        </div>
      </div>

      <div className="my-6 relative min-h-[310px] sm:min-h-[350px] rounded-2xl bg-gradient-to-b from-[#FDF4D2]/40 via-[#FDF4D2]/20 to-white flex flex-col items-center justify-center p-6 overflow-hidden border border-[#946D6D]/10">
        <div
          className="absolute inset-0 opacity-15 blur-2xl transition-colors duration-500 rounded-full scale-75"
          style={{ backgroundColor: cakeColorHex }}
        />

        {designMode === "photo" && inspirationImage ? (
          <div className="relative w-full max-w-[240px] text-center space-y-3 z-10">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white aspect-4/3 bg-white">
              <img
                src={inspirationImage}
                alt="Cake Reference"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-[#CF7D65] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                Your Reference Photo
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/90 shadow-xs border border-[#946D6D]/10 text-left space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Shape:</span>
                <span className="font-bold text-[#6B6D43]">{shape?.name || "Round"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Size:</span>
                <span className="font-bold text-[#6B6D43]">{size?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Flavor:</span>
                <span className="font-bold text-[#6B6D43]">{flavor?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Filling:</span>
                <span className="font-bold text-[#6B6D43]">{filling?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Theme Color:</span>
                <span className="font-bold text-[#6B6D43] flex items-center gap-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20"
                    style={{ backgroundColor: cakeColorHex }}
                  />
                  {color?.name}
                </span>
              </div>
            </div>

            {message.trim() && (
              <div className="bg-white/95 px-3 py-1 rounded-full shadow-xs border border-[#CF7D65]/30 text-center">
                <p className="text-xs font-serif font-bold text-[#CF7D65] italic truncate">
                  "{message}"
                </p>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            key={`${shape?.id}-${size?.id}-${flavor?.id}-${color?.id}-${decorations.length}`}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative flex flex-col items-center justify-end w-full max-w-[260px] pb-6"
          >
            <div className="h-10 flex items-end justify-center z-30 mb-[-4px]">
              {hasBirthdayTopper && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-amber-400/90 text-amber-950 font-serif font-black text-[11px] px-3 py-1 rounded-md shadow-md border border-amber-300 transform -rotate-2"
                >
                  🎂 Happy Birthday
                </motion.div>
              )}
              {hasWeddingTopper && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-rose-100 text-rose-800 font-serif font-bold text-[11px] px-3 py-1 rounded-full shadow-md border border-rose-200"
                >
                  💍 Best Wishes
                </motion.div>
              )}
              {!hasBirthdayTopper && !hasWeddingTopper && (
                <div className="flex gap-1 items-center">
                  {hasFlowers && <span className="text-xl">🌸</span>}
                  {hasFruit && <span className="text-xl">🍓</span>}
                  {hasMacarons && <span className="text-xl">🧁</span>}
                  {!hasFlowers && !hasFruit && !hasMacarons && (
                    <span className="text-2xl animate-bounce">🕯️</span>
                  )}
                </div>
              )}
            </div>

            {isTripleTier && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="w-24 h-12 rounded-t-xl relative shadow-md z-25 border-b border-black/10 transition-colors duration-500 overflow-hidden"
                style={{ backgroundColor: cakeColorHex }}
              >
                {hasDrip && (
                  <div className="absolute top-0 inset-x-0 h-4 bg-amber-950/70 rounded-b-md" />
                )}
                {hasSprinkles && (
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ec4899_1px,transparent_1px),radial-gradient(#eab308_1px,transparent_1px)] bg-[size:6px_6px]" />
                )}
              </motion.div>
            )}

            {isMultiTier && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="w-36 h-14 rounded-t-xl relative shadow-md z-20 border-b border-black/10 transition-colors duration-500 overflow-hidden"
                style={{ backgroundColor: cakeColorHex }}
              >
                {hasDrip && (
                  <div className="absolute top-0 inset-x-0 h-4 bg-amber-950/70 rounded-b-md" />
                )}
                {hasSprinkles && (
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ec4899_1px,transparent_1px),radial-gradient(#eab308_1px,transparent_1px)] bg-[size:6px_6px]" />
                )}
                {hasPearls && (
                  <div className="absolute bottom-1 inset-x-2 flex justify-around text-[7px] text-white">
                    ● ● ● ● ● ●
                  </div>
                )}
              </motion.div>
            )}

            <div
              className={`w-48 sm:w-52 ${isMultiTier ? "h-16" : "h-24"} ${getShapeClasses()} relative shadow-lg z-10 transition-colors duration-500 flex flex-col justify-between overflow-hidden`}
              style={{ backgroundColor: cakeColorHex }}
            >
              {shape?.id === "heart" && (
                <div className="absolute top-2 right-2 text-rose-400 opacity-60 text-lg">
                  💖
                </div>
              )}
              {hasDrip && (
                <div className="absolute top-0 inset-x-0 h-6 bg-amber-950/80 rounded-b-lg shadow-xs" />
              )}
              {hasSprinkles && (
                <div className="absolute inset-0 opacity-50 bg-[radial-gradient(#ec4899_1.5px,transparent_1.5px),radial-gradient(#eab308_1.5px,transparent_1.5px),radial-gradient(#3b82f6_1.5px,transparent_1.5px)] bg-[size:8px_8px]" />
              )}
              {hasGold && (
                <div className="absolute inset-0 opacity-70 bg-[radial-gradient(#fbbf24_2px,transparent_2px)] bg-[size:12px_12px]" />
              )}
              <div
                className="w-full h-1.5 my-auto opacity-30 shadow-inner"
                style={{
                  backgroundColor:
                    filling?.id === "chocolate-ganache" || filling?.id === "nutella"
                      ? "#3e2723"
                      : filling?.id === "strawberry-cream"
                      ? "#e91e63"
                      : "#ffffff",
                }}
              />
              {hasPearls && (
                <div className="absolute bottom-1 inset-x-3 flex justify-around text-[8px] text-white">
                  ● ● ● ● ● ● ● ●
                </div>
              )}
            </div>

            <div className="w-56 sm:w-60 h-4 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 rounded-full shadow-md border border-amber-300/60 z-0 flex items-center justify-center">
              <div className="w-48 h-1 bg-amber-300/40 rounded-full" />
            </div>

            {message.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 bg-white/95 px-4 py-1.5 rounded-full shadow-md border border-[#CF7D65]/30 text-center max-w-[220px]"
              >
                <p className="text-xs font-serif font-bold text-[#CF7D65] italic truncate">
                  "{message}"
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {designMode === "scratch" && inspirationImage && (
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-white/95 p-1.5 rounded-xl shadow-md border border-gray-200 text-[10px] text-gray-600">
            <img
              src={inspirationImage}
              alt="Inspiration"
              className="w-7 h-7 rounded-lg object-cover"
            />
            <span className="font-semibold pr-1">Inspiration Photo</span>
          </div>
        )}
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex flex-wrap gap-1.5">
          {shape && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FDF4D2] text-[#6B6D43] border border-[#6B6D43]/15">
              Shape: {shape.name}
            </span>
          )}
          {flavor && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FDF4D2] text-[#6B6D43] border border-[#6B6D43]/15">
              Flavor: {flavor.name}
            </span>
          )}
          {filling && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FDF4D2] text-[#6B6D43] border border-[#6B6D43]/15">
              Filling: {filling.name}
            </span>
          )}
          {color && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FDF4D2] text-[#6B6D43] border border-[#6B6D43]/15 flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/20"
                style={{ backgroundColor: color.hex }}
              />
              {color.name}
            </span>
          )}
          {designMode === "photo" && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              ✓ Custom Photo Replicated
            </span>
          )}
          {designMode === "scratch" &&
            decorations.map((d) => (
              <span
                key={d.id}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#B0CDE6]/30 text-[#946D6D] border border-[#946D6D]/15"
              >
                + {d.name}
              </span>
            ))}
        </div>

        <div className="pt-3 border-t border-[#946D6D]/10 flex justify-between items-baseline">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Calculated Subtotal:
          </span>
          <span className="text-2xl font-black text-[#CF7D65]">
            Rs. {Number(totalPrice).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
