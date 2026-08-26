import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiChevronRight, FiStar, FiHeart } from "react-icons/fi";
import Navbar from "../components/layout/Navbar";
import CustomCakeBuilder from "../components/customCake/CustomCakeBuilder";

export default function CustomCake() {
  return (
    <div className="min-h-screen bg-[#FDF4D2]/20 flex flex-col">
      <Navbar />

      {/* Page Header - Elegant Custom Cake Introduction */}
      <section className="bg-[#F2DEC7] py-12 sm:py-16 border-b border-[#946D6D]/15">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 text-[#CF7D65] text-xs font-bold shadow-2xs mb-3"
          >
            <FiStar className="w-3.5 h-3.5" />
            <span>Artisan Cake Atelier</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-[#6B6D43] tracking-tight leading-tight"
          >
            Create Your Dream Cake
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-gray-700 max-w-xl mx-auto leading-relaxed"
          >
            Designed by you, made with love by <strong>Eat My Cake</strong>. Choose every detail and create a cake that's perfect for your special occasion.
          </motion.p>

          {/* Breadcrumb */}
          <nav className="flex justify-center items-center gap-2 mt-4 text-xs font-medium text-gray-600">
            <Link to="/" className="hover:text-[#CF7D65] transition">
              Home
            </Link>
            <FiChevronRight className="w-3 h-3 text-gray-400" />
            <Link to="/cakes" className="hover:text-[#CF7D65] transition">
              Cakes
            </Link>
            <FiChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-[#CF7D65] font-bold">Custom Cake Builder</span>
          </nav>
        </div>
      </section>

      {/* Main Builder Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 w-full flex-1">
        <CustomCakeBuilder />
      </main>

      {/* Footer Trust Guarantees */}
      <footer className="bg-white border-t border-[#946D6D]/10 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
            Handcrafted with <FiHeart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by Elegant Eats Pastry Masters
          </p>
          <p className="text-[11px] text-gray-400">
            Colombo Express Temperature-Controlled Delivery • 100% Satisfaction Guarantee
          </p>
        </div>
      </footer>
    </div>
  );
}

