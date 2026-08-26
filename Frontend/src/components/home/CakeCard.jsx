import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

const CakeCard = ({ image, name, price, rating }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition"
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-72 object-cover"
        />

        <button
          className="absolute right-4 top-4 bg-white p-3 rounded-full shadow text-[#946D6D] hover:text-[#A290B7] transition"
        >
          <FiHeart />
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-[#946D6D]">
          {name}
        </h3>

        <div className="mt-3">
          <span className="text-yellow-500">
            ★★★★★
          </span>
          <span className="text-gray-500 ml-2">
            ({rating})
          </span>
        </div>

        <div className="flex justify-between items-center mt-5">
          <p className="text-2xl font-bold text-[#946D6D]">
            Rs. {price}
          </p>

          <button
            className="bg-[#946D6D] hover:bg-[#7e5b5b] text-white p-3 rounded-full transition"
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CakeCard;