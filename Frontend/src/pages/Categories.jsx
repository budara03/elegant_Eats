import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import CategoryFilter from "../components/categories/CategoryFilter";
import CategoryCard from "../components/categories/CategoryCard";

const allCategoriesData = [
  // Party Cakes
  {
    title: "Birthday Cakes",
    group: "Party Cakes",
    description: "Beautiful handcrafted cakes designed for birthdays and special celebrations",
    count: 45,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Wedding Cakes",
    group: "Party Cakes",
    description: "Elegant tier wedding cakes tailored for your special day",
    count: 30,
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Anniversary Cakes",
    group: "Party Cakes",
    description: "Romantic and luxurious anniversary celebration cakes with floral accents",
    count: 35,
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=800&q=80",
  },

  // Custom Cakes
  {
    title: "Custom Cakes",
    group: "Custom Cakes",
    description: "Create your own dream cake design exactly as you imagine",
    count: 60,
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80",
  },

  // Other Cakes
  {
    title: "Cupcakes",
    group: "Other Cakes",
    description: "Small gourmet treats and decorated cupcakes for every sweet tooth",
    count: 25,
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cheesecakes",
    group: "Other Cakes",
    description: "Rich, creamy, and decadent artisan cheesecakes with fruity glazes",
    count: 18,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Kids Cakes",
    group: "Other Cakes",
    description: "Fun, vibrant, and whimsical themed cakes crafted for kids' parties",
    count: 40,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Butter Cakes",
    group: "Other Cakes",
    description: "Classic rich, fluffy, and golden traditional butter sponge cakes",
    count: 22,
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Chocolate Cakes",
    group: "Other Cakes",
    description: "Decadent dark chocolate fudge and ganache layered celebration cakes",
    count: 38,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Ribbon Cakes",
    group: "Other Cakes",
    description: "Delightful multi-colored layered ribbon celebration cakes",
    count: 28,
    image: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&w=800&q=80",
  },

  // Bakery Items
  {
    title: "Bakery Items",
    group: "Bakery Items",
    description: "Freshly baked artisan croissants, danishes, savoury puffs, and rolls",
    count: 35,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Fresh Breads & Buns",
    group: "Bakery Items",
    description: "Warm oven-baked sourdough, baguettes, sandwich loaves, and dinner buns",
    count: 20,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
  },

  // Party Desserts
  {
    title: "Party Desserts",
    group: "Party Desserts",
    description: "Dessert cups, cookies, macarons, toppers, and celebration treats",
    count: 50,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
  },
];

const filterGroups = [
  "All",
  "Party Cakes",
  "Custom Cakes",
  "Other Cakes",
  "Bakery Items",
  "Party Desserts",
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCategories =
    selectedCategory === "All"
      ? allCategoriesData
      : allCategoriesData.filter(
          (item) =>
            item.group === selectedCategory || item.title === selectedCategory
        );

  return (
    <div className="min-h-screen bg-[#FDF4D2]/20">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#FDF4D2] py-20 border-b border-[#946D6D]/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#946D6D]"
          >
            Cake & Bakery Categories
          </motion.h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our handcrafted collections of cakes, artisan pastries, fresh breads, and party desserts
          </p>
        </div>
      </section>

      {/* Category Filter Component */}
      <CategoryFilter
        categories={filterGroups}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Category Cards Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {filteredCategories.map((category) => (
                <motion.div
                  key={category.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <CategoryCard {...category} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-[#946D6D] font-medium">
                No categories found for "{selectedCategory}".
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Categories;