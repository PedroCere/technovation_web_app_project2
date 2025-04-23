import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaProjectDiagram, FaLeaf, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import "./SplashScreen.css";

const sections = [
  {
    title: "Dashboard",
    icon: <FaChartLine className="text-4xl mb-2" />,
    path: "/dashboard",
    color: "bg-gradient-to-br from-emerald-500 to-green-600",
    description: "Overview of key metrics and insights",
    position: "top-left"
  },
  {
    title: "Predictions",
    icon: <FaProjectDiagram className="text-4xl mb-2" />,
    path: "/predictions",
    color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    description: "AI-driven forecasts for emissions",
    position: "top-right"
  },
  {
    title: "Carbon Analysis",
    icon: <FaLeaf className="text-4xl mb-2" />,
    path: "/carbon",
    color: "bg-gradient-to-br from-lime-500 to-emerald-600",
    description: "Detailed breakdown of CO₂ impact",
    position: "bottom-left"
  },
  {
    title: "Account",
    icon: <FaUserCircle className="text-4xl mb-2" />,
    path: "/account",
    color: "bg-gradient-to-br from-purple-500 to-pink-600",
    description: "Manage your personal and company info",
    position: "bottom-right"
  }
];

const SplashScreen = memo(({ onComplete }) => {
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="no-opacity-transition fixed inset-0 bg-[#0A0F0A] flex flex-col items-center justify-center z-50 pointer-events-none"
    >
      <motion.div
        animate={floatingAnimation}
        className="relative"
      >
        <motion.img
          src="/oxilogo.png"
          alt="OXI Logo"
          className="w-48 mb-4"
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ 
            scale: 1,
            rotate: 5,
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }
          }}
        />
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            delay: 0.5,
            type: "spring",
            stiffness: 50
          }
        }}
        className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent"
      >
        Carbon Footprint Manager
      </motion.h1>
    </motion.div>
  );
});

const EntrySelector = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const onCompleteCalled = useRef(false);

  const handleComplete = useCallback(() => {
    if (!onCompleteCalled.current) {
      onCompleteCalled.current = true;
      setShowSplash(false);
    }
  }, []);

  const springConfig = { stiffness: 300, damping: 20 };

  const getInitialPosition = (position) => {
    switch(position) {
      case 'top-left': return { x: -100, y: -100 };
      case 'top-right': return { x: 100, y: -100 };
      case 'bottom-left': return { x: -100, y: 100 };
      case 'bottom-right': return { x: 100, y: 100 };
      default: return { x: 0, y: 0 };
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F0A] grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      {sections.map((section, i) => {
        const initialPos = getInitialPosition(section.position);
        
        return (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              x: initialPos.x,
              y: initialPos.y,
              scale: 0.8,
              rotate: section.position.includes('left') ? -5 : 5
            }}
            animate={{ 
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                ...springConfig,
                delay: i * 0.15 + 0.5
              }
            }}
            className="relative group cursor-pointer"
            onClick={() => {
              navigate(section.path);
            }}
            whileHover={{
              scale: 1.05,
              rotate: section.position.includes('left') ? -1 : 1,
              transition: { type: "spring", ...springConfig }
            }}
            whileTap={{
              scale: 0.95,
              rotate: section.position.includes('left') ? 2 : -2
            }}
            style={{ zIndex: 1 }}
          >
            <motion.div
              className={`absolute inset-0 ${section.color} opacity-90`}
              initial={{ scale: 1 }}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 2 }
              }}
            />
            
            <div className="h-[50vh] flex flex-col items-center justify-center relative z-10">
              <motion.div
                className="mb-4 text-white"
                whileHover={{ 
                  scale: 1.3,
                  rotate: 10,
                  transition: { type: "spring", ...springConfig }
                }}
              >
                {section.icon}
              </motion.div>
              
              <motion.h2
                className="text-2xl font-bold text-white mb-2"
                whileHover={{ scale: 1.1 }}
              >
                {section.title}
              </motion.h2>
              
              <motion.div
                initial={{ 
                  opacity: 0,
                  y: 20,
                  filter: "blur(5px)"
                }}
                whileHover={{ 
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { 
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
                className="text-sm text-white/80 px-4 text-center absolute bottom-8"
              >
                {section.description}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
      
      {showSplash && (
        <SplashScreen onComplete={handleComplete} />
      )}
    </div>
  );
};

export default EntrySelector;
