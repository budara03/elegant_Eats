import React from "react";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";

const CakeCard = ({ image, name, price, rating }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col justify-between bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#946D6D]/10 group"
    >
      <div className="relative w-full h-64 overflow-hidden bg-[#FDF4D2]/40">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
        />

        <button
          type="button"
          className="absolute right-4 top-4 bg-white/90 backdrop-blur-xs p-3 rounded-full shadow-md text-[#946D6D] hover:text-[#A290B7] hover:bg-white transition"
        >
          <FiHeart className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[#946D6D] group-hover:text-[#A290B7] transition line-clamp-1 h-7">
            {name}
          </h3>

          <div className="flex items-center gap-1.5 h-6">
            <div className="flex text-amber-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="fill-current" />
              ))}
            </div>
            <span className="text-gray-500 text-xs font-semibold">
              ({rating})
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-[#946D6D]/10 mt-auto">
          <div>
            <span className="text-[10px] text-gray-400 block font-medium">
              Price
            </span>
            <p className="text-2xl font-bold text-[#946D6D]">
              Rs. {Number(price).toLocaleString()}
            </p>
          </div>

          <button
            type="button"
            className="bg-[#946D6D] hover:bg-[#7e5b5b] text-white p-3.5 rounded-full shadow-md transition transform active:scale-95 flex items-center justify-center"
          >
            <FiShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CakeCard;