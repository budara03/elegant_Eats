import { motion } from "framer-motion";

const defaultCategories = [
  "All",
  "Party Cakes",
  "Custom Cakes",
  "Other Cakes",
  "Bakery Items",
  "Party Desserts",
];

const CategoryFilter = ({
  categories = defaultCategories,
  selectedCategory = "All",
  onSelectCategory,
}) => {
  return (
    <div className="w-full max-w-8xl mx-auto px-6 py-6">
      {/* Horizontal Category Buttons on Desktop with ample vertical padding to prevent border/shadow clipping */}
      <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-3 px-2 md:flex-wrap md:justify-center">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <motion.button
              key={category}
              onClick={() => onSelectCategory && onSelectCategory(category)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`relative px-6 py-2.5 rounded-full text-sm sm:text-base font-medium whitespace-nowrap transition-all duration-300 shadow-sm border-2 focus:outline-none ${
                isSelected
                  ? "bg-[#946D6D] text-white border-[#946D6D] shadow-md font-semibold"
                  : "bg-[#FDF4D2] text-[#946D6D] border-[#946D6D]/25 hover:bg-[#B0CDE6]/40 hover:border-[#946D6D]/60"
              }`}
            >
              {category}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
export { defaultCategories };
