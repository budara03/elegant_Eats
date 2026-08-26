import React from "react";
import {
  FiShoppingCart,
  FiMinus,
  FiPlus,
  FiCheck,
  FiDollarSign,
} from "react-icons/fi";

export default function PriceSummary({
  cake,
  onAddToCart,
  onChangeQuantity,
  isAddingToCart = false,
  addedSuccess = false,
  showFullBreakdown = true,
}) {
  const {
    size,
    flavor,
    filling,
    decorations = [],
    deliveryMethod = "delivery",
    quantity = 1,
  } = cake;

  const basePrice = size ? size.price : 0;
  const flavorPrice = flavor ? flavor.price : 0;
  const fillingPrice = filling ? filling.price : 0;
  const decorPrice = decorations.reduce((sum, d) => sum + (d.price || 0), 0);
  const deliveryFee = deliveryMethod === "delivery" ? 650 : 0;

  const itemSubtotal = basePrice + flavorPrice + fillingPrice + decorPrice;
  const grandTotal = itemSubtotal * quantity + (quantity > 0 ? deliveryFee : 0);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-[#946D6D]/15 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#946D6D]/10">
        <h4 className="text-sm font-bold text-[#6B6D43] uppercase tracking-wider flex items-center gap-1.5">
          <FiDollarSign className="w-4 h-4 text-[#CF7D65]" />
          Order Price Breakdown
        </h4>
        <span className="text-xs text-gray-500 font-medium">LKR Currency</span>
      </div>

      {showFullBreakdown && (
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex justify-between items-center">
            <span>Cake Base ({size?.name || "Not selected"}):</span>
            <span className="font-bold text-[#6B6D43]">
              Rs. {basePrice.toLocaleString()}
            </span>
          </div>

          {flavor && (
            <div className="flex justify-between items-center">
              <span>Flavor ({flavor.name}):</span>
              <span className="font-bold text-[#6B6D43]">
                {flavorPrice > 0 ? `+ Rs. ${flavorPrice.toLocaleString()}` : "Included"}
              </span>
            </div>
          )}

          {filling && (
            <div className="flex justify-between items-center">
              <span>Filling ({filling.name}):</span>
              <span className="font-bold text-[#6B6D43]">
                {fillingPrice > 0 ? `+ Rs. ${fillingPrice.toLocaleString()}` : "Included"}
              </span>
            </div>
          )}

          {decorations.length > 0 && (
            <div className="flex justify-between items-center">
              <span>Decorations ({decorations.length} items):</span>
              <span className="font-bold text-[#6B6D43]">
                + Rs. {decorPrice.toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center text-emerald-700">
            <span>Custom Script Writing:</span>
            <span className="font-bold">Free</span>
          </div>

          <div className="flex justify-between items-center">
            <span>
              {deliveryMethod === "delivery" ? "Temperature Controlled Delivery:" : "Store Pickup:"}
            </span>
            <span className="font-bold text-[#6B6D43]">
              {deliveryFee > 0 ? `Rs. ${deliveryFee.toLocaleString()}` : "Free"}
            </span>
          </div>
        </div>
      )}

      <div className="pt-3 border-t border-[#946D6D]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <span className="text-xs font-bold text-[#6B6D43]">Quantity:</span>
          <div className="flex items-center border-2 border-[#E1B8A2] rounded-xl bg-[#FDF4D2]/40 overflow-hidden">
            <button
              type="button"
              onClick={() => onChangeQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1.5 text-[#CF7D65] hover:bg-[#CF7D65]/10 transition cursor-pointer"
            >
              <FiMinus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 font-bold text-sm text-[#6B6D43]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onChangeQuantity(quantity + 1)}
              className="px-3 py-1.5 text-[#CF7D65] hover:bg-[#CF7D65]/10 transition cursor-pointer"
            >
              <FiPlus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="text-right w-full sm:w-auto flex sm:flex-col justify-between sm:justify-center items-center sm:items-end">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
            Total Amount
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#CF7D65]">
            Rs. {grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onAddToCart}
        disabled={isAddingToCart}
        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
          addedSuccess
            ? "bg-emerald-600 text-white shadow-emerald-200"
            : "bg-[#CF7D65] hover:bg-[#6B6D43] text-white active:scale-98"
        }`}
      >
        {addedSuccess ? (
          <>
            <FiCheck className="w-5 h-5 stroke-[3]" />
            Custom Cake Added to Cart!
          </>
        ) : (
          <>
            <FiShoppingCart className="w-5 h-5" />
            Add Custom Cake to Cart • Rs. {grandTotal.toLocaleString()}
          </>
        )}
      </button>
    </div>
  );
}
