import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaSearch, FaBell, FaSun } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-16 flex items-center justify-between px-6 md:px-8 bg-[#1B1B1B] border-b border-[#2F2F2F] shadow-sm"
    >
      {/* User + Dropdown */}
      <div className="flex items-center gap-4 relative cursor-pointer">
        <div className="relative" onClick={toggleMenu}>
          <img
            src="/foto_usuario.jpg"
            alt="Usuario"
            className="h-10 w-10 rounded-full object-cover border-2 border-transparent hover:border-emerald-400 transition-all"
          />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 border-2 border-[#1B1B1B]" />
        </div>
        <span className="text-sm font-medium text-white" onClick={toggleMenu}>Gabo Rosendorf</span>
        <FiChevronDown
          className={`text-gray-400 transition-colors ${isMenuOpen ? "rotate-180 text-emerald-400" : "group-hover:text-emerald-400"}`}
          onClick={toggleMenu}
        />

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute top-14 left-0 w-48 bg-[#252525] rounded-lg shadow-xl z-50 border border-[#2F2F2F]"
            >
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-emerald-400/10 transition-all">
                  Profile Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-emerald-400/10 transition-all">
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="text-gray-400 hover:text-white transition">
          <FaBell />
        </button>

        {/* Theme */}
        <button className="text-gray-400 hover:text-yellow-400 transition">
          <FaSun />
        </button>

        {/* Search */}
        <div className="flex items-center bg-[#252525] px-4 py-2 rounded-md border border-[#2F2F2F] hover:border-emerald-400 transition-colors">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm placeholder-gray-500 text-white w-40 focus:w-60 transition-all duration-300"
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
