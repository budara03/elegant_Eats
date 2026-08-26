import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Birthday Cakes",
    description: "Beautiful cakes designed for birthdays and celebrations",
    count: 45,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  },
  {
    title: "Wedding Cakes",
    description: "Elegant wedding cakes made for your special day",
    count: 30,
    image: "https://images.unsplash.com/photo-1519869325930-281384150729",
  },
  {
    title: "Custom Cakes",
    description: "Create your own dream cake design",
    count: 60,
    image: "https://images.unsplash.com/photo-1559628233-100c798642d4",
  },
  {
    title: "Cupcakes",
    description: "Small delicious treats for every occasion",
    count: 25,
    image: "https://images.unsplash.com/photo-1426869981800-95ebf51ce900",
  },
  {
    title: "Cookies",
    description: "Fresh handmade cookies and desserts",
    count: 20,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
  },
  {
    title: "Party Items",
    description: "Balloons, candles, toppers and decorations",
    count: 50,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d",
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

      {/* Category Cards */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;