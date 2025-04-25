import React, { useEffect } from "react";
import { motion } from "framer-motion";

const splitVariantsLeft = {
  initial: { x: 0 },
  animate: { x: "-50vw" },
  transition: { duration: 1, ease: "easeInOut" }
};

const splitVariantsRight = {
  initial: { x: 0 },
  animate: { x: "50vw" },
  transition: { duration: 1, ease: "easeInOut" }
};

const emojiVariants = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.5 } }
};

export default function LoadingTransition({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50 overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full border-r-2 border-emerald-400 z-50"
        initial="initial"
        animate="animate"
        variants={splitVariantsLeft}
        transition={splitVariantsLeft.transition}
      />
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full border-l-2 border-emerald-400 z-50"
        initial="initial"
        animate="animate"
        variants={splitVariantsRight}
        transition={splitVariantsRight.transition}
      />
      <motion.div
        className="z-50 text-8xl text-white select-none"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={emojiVariants}
        transition={{ duration: 1 }}
      >
        🌱
      </motion.div>
    </div>
  );
}
