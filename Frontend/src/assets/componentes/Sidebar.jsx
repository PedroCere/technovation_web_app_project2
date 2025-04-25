import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setIsHovered(true), 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setIsHovered(false), 200);
  };

  return (
<motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ width: isHovered ? 256 : 64 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="h-screen bg-[#1B1B1B] border-r border-[#2F2F2F] backdrop-blur-md shadow-xl overflow-hidden relative flex flex-col shrink-0 z-50"
    >
      <div className="p-4 w-full">

        <nav className="space-y-6">
          <section>
            <AnimatePresence>
              {isHovered && (
                <motion.h3
                  className="text-xs uppercase text-gray-400 tracking-widest mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Navigation
                </motion.h3>
              )}
            </AnimatePresence>
            <div className="space-y-2">
              {navLinks.map((item, index) => (
                <Link key={index} to={item.path}>
                  <button
                    className={`w-full flex items-center ${isHovered ? "justify-start px-4" : "justify-center px-2"} gap-3 py-2.5 rounded-lg transition-all duration-200 ${
                      location.pathname === item.path
                        ? "bg-emerald-500/10 text-emerald-300 border border-emerald-400/20"
                        : "hover:bg-emerald-400/5 text-gray-300"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {isHovered && <span className="text-sm font-medium">{item.label}</span>}
                  </button>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <AnimatePresence>
              {isHovered && (
                <motion.h3
                  className="text-xs uppercase text-gray-400 tracking-widest mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Configuration
                </motion.h3>
              )}
            </AnimatePresence>
            <div className="space-y-2">
              {settingsLinks.map((item, index) => (
                <Link key={index} to={item.path}>
                  <button
                    className={`w-full flex items-center ${isHovered ? "justify-start px-4" : "justify-center px-2"} gap-3 py-2.5 rounded-lg transition-all duration-200 ${
                      location.pathname === item.path
                        ? "bg-emerald-500/10 text-emerald-300 border border-emerald-400/20"
                        : "hover:bg-emerald-400/5 text-gray-300"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {isHovered && <span className="text-sm font-medium">{item.label}</span>}
                  </button>
                </Link>
              ))}
            </div>
          </section>

          <section className="pt-6 border-t border-[#2F2F2F]">
            <button
              className={`w-full flex items-center ${isHovered ? "justify-start px-4" : "justify-center px-2"} gap-3 py-2.5 rounded-lg hover:bg-rose-500/10 text-rose-300 transition-all`}
            >
              <span className="text-lg"><FaSignOutAlt /></span>
              {isHovered && <span className="text-sm font-medium">Logout</span>}
            </button>
          </section>
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
