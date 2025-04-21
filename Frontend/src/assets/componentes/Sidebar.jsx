import React from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaLeaf,
  FaProjectDiagram,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const navLinks = [
  { icon: <FaChartLine />, label: "Dashboard", active: true },
  { icon: <FaLeaf />, label: "Carbon Analysis" },
  { icon: <FaProjectDiagram />, label: "Projects" },
];

const settingsLinks = [
  { icon: <FaCog />, label: "Preferences" },
  { icon: <FaUserCircle />, label: "Account" },
  { icon: <FaSignOutAlt />, label: "Logout" },
];

const Sidebar = () => {
  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 min-h-screen p-6 bg-[#1B1B1B] border-r border-[#2F2F2F] shadow-md"
    >
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-emerald-400 tracking-wide">OXI</h1>
        <p className="text-sm text-emerald-300">Carbon Footprint Manager</p>
      </div>

      {/* Navegación */}
      <nav className="space-y-6">
        <section>
          <h3 className="text-xs uppercase text-gray-400 tracking-widest mb-3">Navigation</h3>
          <div className="space-y-2">
            {navLinks.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  item.active
                    ? "bg-emerald-500/10 text-emerald-300 border border-emerald-400/20"
                    : "hover:bg-emerald-400/5 text-gray-300"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs uppercase text-gray-400 tracking-widest mb-3">Settings</h3>
          <div className="space-y-2">
            {settingsLinks.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-emerald-400/5 transition-all text-gray-300"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </section>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
