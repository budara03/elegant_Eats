import CakeCard from "./CakeCard";
import { motion } from "framer-motion";

const cakes = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    name: "Chocolate Dream Cake",
    price: 3500,
    rating: "4.9",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
    name: "Strawberry Cake",
    price: 4200,
    rating: "5.0",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519869325930-281384150729",
    name: "Wedding Cake",
    price: 8500,
    rating: "4.8",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1426869981800-95ebf51ce900",
    name: "Cupcake Box",
    price: 2500,
    rating: "4.9",
  },
];

const FeaturedCakes = () => {
  return (
    <section className="bg-[#FDF4D2] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-[#946D6D] mb-12"
        >
          Featured Cakes
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cakes.map((cake) => (
            <CakeCard
              key={cake.id}
              image={cake.image}
              name={cake.name}
              price={cake.price}
              rating={cake.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCakes;