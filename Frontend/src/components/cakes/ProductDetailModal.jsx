import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiStar,
  FiShoppingCart,
  FiHeart,
  FiPlus,
  FiMinus,
  FiCheck,
  FiPackage,
  FiShield,
  FiClock,
  FiSend,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const defaultReviews = [
  {
    id: 1,
    name: "Kavindi Perera",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    date: "2 days ago",
    comment:
      "Ordered this for my sister's birthday and everyone was amazed! The sponge was extremely moist and the frosting wasn't overly sweet. Absolutely gourmet quality.",
  },
  {
    id: 2,
    name: "Dinuka Fernando",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    date: "1 week ago",
    comment:
      "Stunning presentation and arrived right on time in pristine condition. Highly recommended for special celebrations!",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    rating: 4,
    date: "2 weeks ago",
    comment:
      "Delicious flavors and beautiful texture. Loved the packaging and the custom writing on the cake was flawless.",
  },
];

export default function ProductDetailModal({ isOpen, product, onClose }) {
  // Selection states
  const [selectedSize, setSelectedSize] = useState("1 kg");
  const [selectedFlavor, setSelectedFlavor] = useState("Vanilla");
  const [quantity, setQuantity] = useState(1);
  const [cakeMessage, setCakeMessage] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("details"); // 'details' | 'reviews'
  const [addedToCart, setAddedToCart] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState(defaultReviews);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Synchronize options when product opens
  useEffect(() => {
    if (product) {
      setSelectedSize(
        product.sizes && product.sizes.length > 0 ? product.sizes[0] : "1 kg"
      );
      setSelectedFlavor(
        product.flavors && product.flavors.length > 0
          ? product.flavors[0]
          : "Vanilla"
      );
      setQuantity(1);
      setCakeMessage("");
      setAddedToCart(false);
      setReviewSubmitted(false);
      setActiveTab("details");
    }
  }, [product]);

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen && product) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, product, onClose]);

  // Size-based price scaling multiplier
  const sizeMultiplier = useMemo(() => {
    switch (selectedSize) {
      case "0.5 kg":
        return 0.7;
      case "1 kg":
        return 1.0;
      case "1.5 kg":
        return 1.45;
      case "2 kg":
        return 1.85;
      case "2.5 kg":
        return 2.25;
      case "3 kg+":
        return 2.75;
      default:
        return 1.0;
    }
  }, [selectedSize]);

  const basePrice = product ? product.price : 0;
  const currentPrice = Math.round(basePrice * sizeMultiplier);
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2500);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: newReviewName.trim(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
        newReviewName
      )}`,
      rating: newReviewRating,
      date: "Just now",
      comment: newReviewComment.trim(),
    };

    setReviews([newEntry, ...reviews]);
    setNewReviewName("");
    setNewReviewComment("");
    setNewReviewRating(5);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && product && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] my-auto border border-[#946D6D]/20"
          >
            {/* Header Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-30 bg-white/95 backdrop-blur-xs p-2.5 rounded-full shadow-lg text-gray-700 hover:text-[#946D6D] hover:bg-white transition cursor-pointer border border-gray-200"
              title="Close popup"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Scrollable Container */}
            <div className="overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Column: Media & Badges */}
                <div className="bg-[#FDF4D2]/40 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#946D6D]/15">
                  <div className="space-y-4">
                    {/* Main Cake Image */}
                    <div className="relative rounded-2xl overflow-hidden aspect-4/3 w-full shadow-md bg-white">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Category Badge */}
                      <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-[#946D6D] shadow-xs">
                        {product.category}
                      </span>

                      {/* Availability Tag */}
                      <span className="absolute bottom-3.5 left-3.5 bg-[#946D6D] text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs flex items-center gap-1.5">
                        <FiPackage className="w-3.5 h-3.5" />
                        {product.availability}
                      </span>
                    </div>

                    {/* Trust Guarantees */}
                    <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                      <div className="p-2.5 rounded-xl bg-white border border-[#946D6D]/10 text-center shadow-2xs">
                        <FiShield className="w-4 h-4 text-[#946D6D] mx-auto mb-1" />
                        <span className="text-[10px] font-bold text-gray-700 block">
                          Freshly Baked
                        </span>
                        <span className="text-[9px] text-gray-400">100% Pure</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#946D6D]/10 text-center shadow-2xs">
                        <FiClock className="w-4 h-4 text-[#946D6D] mx-auto mb-1" />
                        <span className="text-[10px] font-bold text-gray-700 block">
                          Same Day
                        </span>
                        <span className="text-[9px] text-gray-400">
                          Delivery Avail.
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#946D6D]/10 text-center shadow-2xs">
                        <FiStar className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                        <span className="text-[10px] font-bold text-gray-700 block">
                          Top Rated
                        </span>
                        <span className="text-[9px] text-gray-400">
                          4.9/5 Average
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dietary Specs */}
                  {product.dietary && product.dietary.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[#946D6D]/10">
                      <span className="text-xs font-bold text-gray-600 block mb-2">
                        Dietary Specifications:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.dietary.map((d) => (
                          <span
                            key={d}
                            className="px-2.5 py-1 rounded-full bg-[#B0CDE6]/40 text-[#946D6D] text-xs font-semibold"
                          >
                            ✓ {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Customization & Feedback */}
                <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
                  {/* Title & Rating */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-[#946D6D]">
                        {product.rating}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveTab("reviews")}
                        className="text-xs text-gray-400 underline hover:text-[#946D6D] transition cursor-pointer"
                      >
                        ({reviews.length} customer reviews)
                      </button>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#946D6D] leading-tight">
                      {product.name}
                    </h2>

                    {/* Price display */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-3xl font-black text-[#946D6D]">
                        Rs. {totalPrice.toLocaleString()}
                      </span>
                      {selectedSize !== "1 kg" && (
                        <span className="text-xs text-gray-400 font-medium">
                          (Rs. {currentPrice.toLocaleString()} / {selectedSize})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tabs Selector */}
                  <div className="flex border-b border-[#946D6D]/15">
                    <button
                      type="button"
                      onClick={() => setActiveTab("details")}
                      className={`pb-2 px-3 text-sm font-bold transition border-b-2 cursor-pointer ${
                        activeTab === "details"
                          ? "border-[#946D6D] text-[#946D6D]"
                          : "border-transparent text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      Cake Options
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("reviews")}
                      className={`pb-2 px-3 text-sm font-bold transition border-b-2 flex items-center gap-1.5 cursor-pointer ${
                        activeTab === "reviews"
                          ? "border-[#946D6D] text-[#946D6D]"
                          : "border-transparent text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <span>Customer Feedback</span>
                      <span className="bg-[#FDF4D2] text-[#946D6D] text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">
                        {reviews.length}
                      </span>
                    </button>
                  </div>

                  {/* Tab 1: Product Customization */}
                  {activeTab === "details" ? (
                    <div className="space-y-5">
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {product.description}
                      </p>

                      {/* 1. Size Selection */}
                      {product.sizes && product.sizes.length > 0 && (
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#946D6D] uppercase tracking-wider block">
                            Select Weight / Size:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {product.sizes.map((size) => (
                              <button
                                type="button"
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border-2 cursor-pointer ${
                                  selectedSize === size
                                    ? "border-[#946D6D] bg-[#946D6D] text-white shadow-xs"
                                    : "border-[#946D6D]/20 bg-[#FDF4D2]/40 text-gray-700 hover:border-[#946D6D]/50"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 2. Flavor Selection */}
                      {product.flavors && product.flavors.length > 0 && (
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#946D6D] uppercase tracking-wider block">
                            Select Flavor / Sponge:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {product.flavors.map((flavor) => (
                              <button
                                type="button"
                                key={flavor}
                                onClick={() => setSelectedFlavor(flavor)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border-2 cursor-pointer ${
                                  selectedFlavor === flavor
                                    ? "border-[#946D6D] bg-[#946D6D] text-white shadow-xs"
                                    : "border-[#946D6D]/20 bg-[#FDF4D2]/40 text-gray-700 hover:border-[#946D6D]/50"
                                }`}
                              >
                                {flavor}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. Custom Writing on Cake */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#946D6D] uppercase tracking-wider block">
                          Message on Cake (Optional):
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Happy 25th Birthday Amanda!"
                          value={cakeMessage}
                          onChange={(e) => setCakeMessage(e.target.value)}
                          maxLength={40}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#946D6D]/25 bg-[#FDF4D2]/30 text-xs sm:text-sm text-[#946D6D] placeholder-gray-400 focus:outline-none focus:border-[#946D6D] transition"
                        />
                        <span className="text-[10px] text-gray-400 block text-right">
                          {cakeMessage.length}/40 characters
                        </span>
                      </div>

                      {/* Quantity & CTA Action */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3">
                          {/* Quantity Selector */}
                          <div className="flex items-center border-2 border-[#946D6D]/25 rounded-2xl bg-[#FDF4D2]/40 overflow-hidden">
                            <button
                              type="button"
                              onClick={() =>
                                setQuantity((q) => Math.max(1, q - 1))
                              }
                              className="px-3.5 py-2.5 text-[#946D6D] hover:bg-[#946D6D]/15 transition cursor-pointer"
                            >
                              <FiMinus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 font-bold text-sm text-[#946D6D]">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantity((q) => q + 1)}
                              className="px-3.5 py-2.5 text-[#946D6D] hover:bg-[#946D6D]/15 transition cursor-pointer"
                            >
                              <FiPlus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Add to Cart CTA */}
                          <button
                            type="button"
                            onClick={handleAddToCart}
                            className={`flex-1 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                              addedToCart
                                ? "bg-emerald-600 text-white shadow-emerald-200"
                                : "bg-[#946D6D] hover:bg-[#7e5b5b] text-white active:scale-98"
                            }`}
                          >
                            {addedToCart ? (
                              <>
                                <FiCheck className="w-4 h-4 stroke-[3]" />
                                Added to Cart!
                              </>
                            ) : (
                              <>
                                <FiShoppingCart className="w-4 h-4" />
                                Add to Cart • Rs. {totalPrice.toLocaleString()}
                              </>
                            )}
                          </button>

                          {/* Wishlist Button */}
                          <button
                            type="button"
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className={`p-3.5 rounded-2xl border-2 transition cursor-pointer ${
                              isWishlisted
                                ? "border-rose-400 bg-rose-50 text-rose-500"
                                : "border-gray-200 bg-white text-gray-400 hover:text-rose-500"
                            }`}
                            title="Add to Wishlist"
                          >
                            <FiHeart
                              className={`w-4 h-4 ${
                                isWishlisted ? "fill-current" : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Tab 2: Customer Feedback & Reviews */
                    <div className="space-y-6">
                      {/* Reviews List */}
                      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                        {reviews.map((rev) => (
                          <div
                            key={rev.id}
                            className="p-3.5 rounded-2xl bg-[#FDF4D2]/30 border border-[#946D6D]/10 space-y-1.5"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <img
                                  src={rev.avatar}
                                  alt={rev.name}
                                  className="w-7 h-7 rounded-full object-cover border border-[#946D6D]/20"
                                />
                                <div>
                                  <h4 className="text-xs font-bold text-[#946D6D]">
                                    {rev.name}
                                  </h4>
                                  <span className="text-[9px] text-gray-400">
                                    {rev.date}
                                  </span>
                                </div>
                              </div>

                              <div className="flex text-amber-400 text-xs">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={
                                      i < rev.rating
                                        ? "text-amber-400"
                                        : "text-gray-200"
                                    }
                                  />
                                ))}
                              </div>
                            </div>

                            <p className="text-xs text-gray-600 leading-relaxed">
                              {rev.comment}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Write a Review Form */}
                      <form
                        onSubmit={handleAddReview}
                        className="p-4 rounded-2xl bg-white border border-[#946D6D]/20 space-y-3 shadow-xs"
                      >
                        <h4 className="text-xs font-bold text-[#946D6D] uppercase tracking-wider">
                          Leave Customer Feedback:
                        </h4>

                        {/* Rating Picker */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 font-medium">
                            Your Rating:
                          </span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                type="button"
                                key={star}
                                onClick={() => setNewReviewRating(star)}
                                className="text-base text-amber-400 focus:outline-none hover:scale-110 transition cursor-pointer"
                              >
                                <FaStar
                                  className={
                                    star <= newReviewRating
                                      ? "text-amber-400"
                                      : "text-gray-200"
                                  }
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Name Input */}
                        <input
                          type="text"
                          placeholder="Your Name..."
                          value={newReviewName}
                          onChange={(e) => setNewReviewName(e.target.value)}
                          required
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#946D6D]"
                        />

                        {/* Comment Input */}
                        <textarea
                          placeholder="Share your experience with this cake..."
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          rows={2}
                          required
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#946D6D] resize-none"
                        />

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-[#946D6D] hover:bg-[#7e5b5b] text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <FiSend className="w-3.5 h-3.5" />
                          Post Review
                        </button>

                        {reviewSubmitted && (
                          <span className="text-xs text-emerald-600 font-bold block text-center">
                            ✓ Thank you! Your review was posted.
                          </span>
                        )}
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

