import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-16 flex items-center justify-between px-6 md:px-8 bg-[#1B1B1B] border-b border-[#2F2F2F] shadow-sm"
    >
      {/* Usuario */}
      <div className="flex items-center gap-4 relative group cursor-pointer">
        <img
          src="/foto_usuario.jpg"
          alt="Usuario"
          className="h-10 w-10 rounded-full object-cover border-2 border-transparent group-hover:border-emerald-400 transition-all"
        />
        <span className="text-sm font-medium text-white">Pedro Quintero</span>
        <FiChevronDown className="text-gray-400 group-hover:text-emerald-400 transition-colors" />

        {/* Dropdown Menu */}
        <div className="absolute top-14 left-0 w-48 bg-[#252525] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 invisible z-50 border border-[#2F2F2F]">
          <div className="py-2">
            <button className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-emerald-400/10 transition-all">
              Profile Settings
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-emerald-400/10 transition-all">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center bg-[#252525] px-4 py-2 rounded-md border border-[#2F2F2F] hover:border-emerald-400 transition-colors">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm placeholder-gray-500 text-white w-40 focus:w-60 transition-all duration-300"
        />
      </div>
    </motion.header>
  );
};

export default Navbar;
