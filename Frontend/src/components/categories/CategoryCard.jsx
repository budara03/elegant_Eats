import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CategoryCard = ({ image, title, description, count }) => {
  const categoryUrl = `/cakes?category=${encodeURIComponent(title)}`;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col justify-between bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#946D6D]/15 group"
    >
      {/* Fixed Aspect Image */}
      <Link
        to={categoryUrl}
        className="block relative w-full h-52 overflow-hidden bg-[#FDF4D2]/40"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
          <span className="text-white text-xs font-semibold flex items-center gap-1">
            Browse {title} <FiArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>

      {/* Uniform Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <Link to={categoryUrl} className="block">
            <h3 className="text-xl font-bold text-[#946D6D] group-hover:text-[#A290B7] transition line-clamp-1 h-7">
              {title}
            </h3>
          </Link>

          <p className="text-gray-500 text-sm line-clamp-2 h-10 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Footer Aligned to Bottom */}
        <div className="flex justify-between items-center pt-3 border-t border-[#946D6D]/10 mt-auto">
          <span className="text-[#946D6D] bg-[#FDF4D2] px-3 py-1 rounded-full text-xs font-bold">
            {count} Products
          </span>

          <Link
            to={categoryUrl}
            className="bg-[#946D6D] text-white px-4 py-2 rounded-full hover:bg-[#7e5b5b] transition text-xs font-bold flex items-center gap-1 shadow-xs"
          >
            <span>View Products</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;