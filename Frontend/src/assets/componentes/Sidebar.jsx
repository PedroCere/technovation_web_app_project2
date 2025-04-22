import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartLine,
  FaLeaf,
  FaProjectDiagram,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
  FaSlidersH
} from "react-icons/fa";

const navLinks = [
  { icon: <FaChartLine />, label: "Dashboard", path: "/dashboard" },
  { icon: <FaLeaf />, label: "Carbon Analysis", path: "/carbon" },
  { icon: <FaProjectDiagram />, label: "Predictions", path: "/predictions" }
];

const settingsLinks = [
  { icon: <FaCog />, label: "Preferences", path: "/preferences" },
  { icon: <FaUserCircle />, label: "Account", path: "/account" },
  { icon: <FaSlidersH />, label: "Settings", path: "/settings" }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 min-h-screen p-6 bg-[#1B1B1B] border-r border-[#2F2F2F] shadow-md"
    >
      {/* Logo */}
      <div className="mb-10">
        <img
          src="/oxilogo.png"
          alt="OXI Logo"
          className="w-36 h-auto object-contain mx-auto"
        />
        <p className="text-sm text-center text-emerald-300 mt-2">Carbon Footprint Manager</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-6">
        <section>
          <h3 className="text-xs uppercase text-gray-400 tracking-widest mb-3">Navigation</h3>
          <div className="space-y-2">
            {navLinks.map((item, index) => (
              <Link key={index} to={item.path}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-400/20"
                      : "hover:bg-emerald-400/5 text-gray-300"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              </Link>
            ))}
          </div>
        </section>

        {/* Settings Section */}
        <section>
          <h3 className="text-xs uppercase text-gray-400 tracking-widest mb-3">Configuration</h3>
          <div className="space-y-2">
            {settingsLinks.map((item, index) => (
              <Link key={index} to={item.path}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-400/20"
                      : "hover:bg-emerald-400/5 text-gray-300"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              </Link>
            ))}
          </div>
        </section>

        {/* Logout */}
        <section className="pt-6 border-t border-[#2F2F2F]">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-rose-500/10 text-rose-300 transition-all"
          >
            <span className="text-lg"><FaSignOutAlt /></span>
            <span className="text-sm font-medium">Logout</span>
          </motion.button>
        </section>
      </nav>
    </motion.div>
  );
};

export default Sidebar;