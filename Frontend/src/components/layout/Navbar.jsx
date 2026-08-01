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
    { name: "Categories", path: "/categories" },
    { name: "Custom Cakes", path: "/custom-cake" },
    { name: "Party Items", path: "/party-items" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#F2DEC7]/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-[#6B6D43]">
            Elegant<span className="text-[#CF7D65]"> Eats</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8 font-medium text-[#6B6D43]">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="hover:text-[#CF7D65] transition duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="hidden lg:flex items-center gap-5">

            <button className="text-xl text-[#6B6D43] hover:text-[#CF7D65]">
              <FiSearch />
            </button>

            <button className="relative text-xl text-[#6B6D43] hover:text-[#CF7D65]">
              <FiShoppingCart />
              <span className="absolute -top-2 -right-2 bg-[#CF7D65] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>

            <button className="bg-[#CF7D65] hover:bg-[#b76650] text-white px-5 py-2 rounded-full flex items-center gap-2 transition">
              <FiUser />
              Login
            </button>

          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-3xl text-[#6B6D43]"
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
          className="lg:hidden bg-[#F2DEC7] shadow-lg"
        >
          <div className="flex flex-col py-6">

            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 text-[#6B6D43] hover:bg-[#E1B8A2]"
              >
                {item.name}
              </Link>
            ))}

            <div className="flex justify-center gap-6 mt-5">

              <button className="text-2xl text-[#6B6D43]">
                <FiSearch />
              </button>

              <button className="text-2xl text-[#6B6D43]">
                <FiShoppingCart />
              </button>

              <button className="text-2xl text-[#6B6D43]">
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