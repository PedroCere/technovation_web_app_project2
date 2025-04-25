import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaProjectDiagram, FaLeaf, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Dashboard",
    icon: <FaChartLine className="text-4xl mb-2" />,
    path: "/dashboard",
    color: "bg-[#1E1E1E] hover:bg-[#162115]",
    description: "Overview of key metrics and insights",
  },
  {
    title: "Predictions",
    icon: <FaProjectDiagram className="text-4xl mb-2" />,
    path: "/predictions",
    color: "bg-[#1E1E1E] hover:bg-[#1A2A30]",
    description: "AI-driven forecasts for emissions",
  },
  {
    title: "Carbon Analysis",
    icon: <FaLeaf className="text-4xl mb-2" />,
    path: "/carbon",
    color: "bg-[#1E1E1E] hover:bg-[#1E2F1E]",
    description: "Detailed breakdown of CO₂ impact",
  },
  {
    title: "Account",
    icon: <FaUserCircle className="text-4xl mb-2" />,
    path: "/account",
    color: "bg-[#1E1E1E] hover:bg-[#2E1E2E]",
    description: "Manage your personal and company info",
  },
];

const EntrySelector = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(false);
  const onCompleteCalled = useRef(false);

  const handleComplete = useCallback(() => {
    if (!onCompleteCalled.current) {
      onCompleteCalled.current = true;
      setShowSplash(false);
    }
  }, []);

  return (
    <div className="bg-[#0A0F0A] min-h-screen text-white font-sans flex flex-col">
      {/* Header superior */}
      <header className="fixed top-0 left-0 w-full h-16 bg-[#0A0F0A] border-b border-emerald-600 shadow-md z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img src="/oxilogo.png" alt="Logo" className="w-10 h-10" />
          <h1 className="text-lg font-bold text-emerald-400">OXI Platform</h1>
        </div>
      </header>

      {/* Dashboards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 px-10 pt-20 pb-10 flex-grow"
      >
        {sections.map((section, i) => (
          <motion.div
            key={i}
            className={`cursor-pointer rounded-2xl overflow-hidden border border-emerald-500/20 ${section.color} transition-colors duration-300`}
            onClick={() => navigate(section.path)}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 text-emerald-400">{section.icon}</div>
              <h2 className="text-xl font-semibold mb-2 text-white">{section.title}</h2>
              <p className="text-sm text-gray-400">{section.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-[#0A0F0A] text-center py-4 border-t border-emerald-600 text-sm text-emerald-200">
        © {new Date().getFullYear()} OXI Platform · All rights reserved
      </footer>
    </div>
  );
};

export default EntrySelector;
