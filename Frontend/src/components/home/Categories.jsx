import React from "react";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Birthday Cakes",
    description: "Beautiful cakes designed for birthdays and celebrations",
    count: 45,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Wedding Cakes",
    description: "Elegant wedding cakes made for your special day",
    count: 30,
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Custom Cakes",
    description: "Create your own dream cake design",
    count: 60,
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cupcakes",
    description: "Small delicious treats for every occasion",
    count: 25,
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cookies",
    description: "Fresh handmade cookies and desserts",
    count: 20,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Party Items",
    description: "Balloons, candles, toppers and decorations",
    count: 50,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
  },
];

const Categories = () => {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#FDF4D2] py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-[#946D6D]"
          >
            Cake Categories
          </motion.h1>
          <p className="mt-5 text-lg text-gray-600">
            Find the perfect cake for every celebration
          </p>
        </div>
      </section>

      {/* Category Cards Grid */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {categories.map((category, index) => (
              <div key={index} className="h-full flex flex-col w-full">
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;