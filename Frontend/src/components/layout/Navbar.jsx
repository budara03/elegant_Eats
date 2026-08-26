import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cakes", path: "/cakes" },
    { name: "Categories", path: "/categories" },
    { name: "Custom Cakes", path: "/custom-cake" },
    { name: "Party Items", path: "/party-items" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#FDF4D2]/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-[#946D6D]">
            Elegant<span className="text-[#A290B7]"> Eats</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8 font-medium text-[#946D6D]">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="hover:text-[#A290B7] transition duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="hidden lg:flex items-center gap-5">

            <Link
              to="/cakes"
              className="text-xl text-[#946D6D] hover:text-[#A290B7] transition flex items-center"
              title="Search Cakes"
            >
              <FiSearch />
            </Link>

            <button className="relative text-xl text-[#946D6D] hover:text-[#A290B7] transition">
              <FiShoppingCart />
              <span className="absolute -top-2 -right-2 bg-[#A290B7] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>

            <button className="bg-[#946D6D] hover:bg-[#7e5b5b] text-white px-5 py-2 rounded-full flex items-center gap-2 transition">
              <FiUser />
              Login
            </button>

          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-3xl text-[#946D6D]"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-[#FDF4D2] shadow-lg"
        >
          <div className="flex flex-col py-6">

            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 text-[#946D6D] hover:bg-[#B0CDE6]/40 transition"
              >
                {item.name}
              </Link>
            ))}

            <div className="flex justify-center gap-6 mt-5">

              <Link
                to="/cakes"
                onClick={() => setIsOpen(false)}
                className="text-2xl text-[#946D6D] hover:text-[#A290B7] transition"
              >
                <FiSearch />
              </Link>

              <button className="text-2xl text-[#946D6D] hover:text-[#A290B7] transition">
                <FiShoppingCart />
              </button>

              <button className="text-2xl text-[#946D6D] hover:text-[#A290B7] transition">
                <FiUser />
              </button>

            </div>

          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;