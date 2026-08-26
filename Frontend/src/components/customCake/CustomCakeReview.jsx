import React from "react";
import {
  FiEdit2,
  FiCheckCircle,
  FiPhone,
  FiUser,
  FiMapPin,
  FiExternalLink,
} from "react-icons/fi";

export default function CustomCakeReview({ cake, onEditStep, designMode = "scratch" }) {
  const {
    shape,
    size,
    flavor,
    filling,
    color,
    decorations = [],
    message = "",
    inspirationImage = null,
    specialInstructions = "",
    customerName = "",
    customerPhone = "",
    locationCoordinates = null,
    locationMapsUrl = "",
    deliveryDate = "",
    deliveryTimeSlot = "",
    deliveryMethod = "delivery",
    deliveryAddress = "",
  } = cake;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-[#6B6D43] flex items-center gap-2">
          <FiCheckCircle className="w-5 h-5 text-emerald-600" />
          Review Your Custom Cake Configuration
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Please verify all specifications before adding your custom creation to the cart.
        </p>
      </div>

      <div className="bg-[#FDF4D2]/30 rounded-2xl border border-[#946D6D]/15 overflow-hidden divide-y divide-[#946D6D]/10">
        <div className="p-3.5 sm:p-4 flex items-center justify-between bg-[#FDF4D2]/50">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
              Customer Contact Information
            </span>
            <span className="text-sm font-bold text-[#6B6D43] flex items-center gap-3 mt-0.5">
              <span className="flex items-center gap-1">
                <FiUser className="w-3.5 h-3.5 text-[#CF7D65]" />
                {customerName || "Guest Customer"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#CF7D65]">
                <FiPhone className="w-3.5 h-3.5" />
                {customerPhone || "Not specified"}
              </span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(8)}
            className="text-xs font-bold text-[#CF7D65] hover:text-[#6B6D43] flex items-center gap-1 cursor-pointer"
          >
            <FiEdit2 className="w-3 h-3" /> Edit
          </button>
        </div>

        <div className="p-3.5 sm:p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
              1. Design Style & Shape
            </span>
            <span className="text-sm font-bold text-[#6B6D43] flex items-center gap-2">
              <span>
                {designMode === "photo"
                  ? "📸 Custom Photo Reference"
                  : "🎨 Handcrafted from Scratch"}
              </span>
              <span>•</span>
              <span>{shape ? `${shape.emoji} ${shape.name}` : "Classic Round"}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-xs font-bold text-[#CF7D65] hover:text-[#6B6D43] flex items-center gap-1 cursor-pointer"
          >
            <FiEdit2 className="w-3 h-3" /> Edit
          </button>
        </div>

        <div className="p-3.5 sm:p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
              2. Cake Size & Portions
            </span>
            <span className="text-sm font-bold text-[#6B6D43]">
              {size ? `${size.name} (${size.servings})` : "Not selected"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="text-xs font-bold text-[#CF7D65] hover:text-[#6B6D43] flex items-center gap-1 cursor-pointer"
          >
            <FiEdit2 className="w-3 h-3" /> Edit
          </button>
        </div>

        <div className="p-3.5 sm:p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
              3. Sponge & Filling
            </span>
            <span className="text-sm font-bold text-[#6B6D43]">
              {flavor?.name} with {filling?.name}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(4)}
            className="text-xs font-bold text-[#CF7D65] hover:text-[#6B6D43] flex items-center gap-1 cursor-pointer"
          >
            <FiEdit2 className="w-3 h-3" /> Edit
          </button>
        </div>

        <div className="p-3.5 sm:p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
              4. Color / Theme
            </span>
            <span className="text-sm font-bold text-[#6B6D43] flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/15 inline-block"
                style={{ backgroundColor: color?.hex }}
              />
              {color?.name || "Vintage Cream"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(6)}
            className="text-xs font-bold text-[#CF7D65] hover:text-[#6B6D43] flex items-center gap-1 cursor-pointer"
          >
            <FiEdit2 className="w-3 h-3" /> Edit
          </button>
        </div>

        <div className="p-3.5 sm:p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
              5. Decorations & Finishing
            </span>
            <span className="text-sm font-bold text-[#6B6D43]">
              {designMode === "photo"
                ? "Replicated from Uploaded Reference Photo ✓"
                : decorations.length > 0
                ? decorations.map((d) => d.name).join(", ")
                : "Standard Bakery Finish"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(designMode === "photo" ? 1 : 6)}
            className="text-xs font-bold text-[#CF7D65] hover:text-[#6B6D43] flex items-center gap-1 cursor-pointer"
          >
            <FiEdit2 className="w-3 h-3" /> Edit
          </button>
        </div>

        <div className="p-3.5 sm:p-4 flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
              6. Custom Greeting & Reference
            </span>
            <p className="text-xs text-[#6B6D43] font-semibold">
              Message: {message ? `"${message}"` : "None"}
            </p>
            {specialInstructions && (
              <p className="text-xs text-gray-500 italic">
                Chef Notes: {specialInstructions}
              </p>
            )}
            {inspirationImage && (
              <div className="flex items-center gap-2 pt-1">
                <img
                  src={inspirationImage}
                  alt="Inspiration"
                  className="w-10 h-10 rounded-lg object-cover border border-[#946D6D]/20 shadow-2xs"
                />
                <span className="text-[11px] text-emerald-700 font-semibold">
                  Reference Photo Attached
                </span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => onEditStep(7)}
            className="text-xs font-bold text-[#CF7D65] hover:text-[#6B6D43] flex items-center gap-1 cursor-pointer"
          >
            <FiEdit2 className="w-3 h-3" /> Edit
          </button>
        </div>

        <div className="p-3.5 sm:p-4 flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
              7. Delivery Schedule & Location
            </span>
            <p className="text-xs font-bold text-[#6B6D43]">
              {deliveryMethod === "delivery" ? "Home Delivery" : "Store Pickup"} • {deliveryDate || "Date TBD"} ({deliveryTimeSlot})
            </p>
            {deliveryMethod === "delivery" && deliveryAddress && (
              <p className="text-[11px] text-gray-500 flex items-start gap-1">
                <FiMapPin className="w-3.5 h-3.5 text-[#CF7D65] flex-shrink-0 mt-0.5" />
                <span>{deliveryAddress}</span>
              </p>
            )}
            {locationMapsUrl && (
              <a
                href={locationMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold hover:underline pt-0.5"
              >
                <span>📍 Verified GPS Map Pin</span>
                <FiExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <button
            type="button"
            onClick={() => onEditStep(8)}
            className="text-xs font-bold text-[#CF7D65] hover:text-[#6B6D43] flex items-center gap-1 cursor-pointer"
          >
            <FiEdit2 className="w-3 h-3" /> Edit
          </button>
        </div>
      </div>
    </div>
  );
}
