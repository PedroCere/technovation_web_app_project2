import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLeaf } from "react-icons/fa";

const splitVariantsLeft = {
  initial: { x: 0 },
  animate: { x: "-50vw", opacity: 0.3 },
  transition: { duration: 1.5, ease: "easeInOut" }
};

const splitVariantsRight = {
  initial: { x: 0 },
  animate: { x: "50vw", opacity: 0.3 },
  transition: { duration: 1.5, ease: "easeInOut" }
};

const phrases = [
  "🌿 Loading smart emission data...",
  "🤖 Calibrating AI prediction models...",
  "🔄 Fetching your latest forecasts...",
  "🧠 Optimizing climate intelligence...",
  "🌍 Preparing a greener future...",
  "⚡ Activating sustainability engine...",
  "📊 Building your carbon insights...",
  "🔬 Processing environmental metrics...",
  "⏳ Just a moment, nature is thinking...",
  "🌱 Planting predictive seeds..."
];

export default function PredictionsLoading({ onComplete }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);

    const completeTimer = setTimeout(() => {
      clearInterval(phraseTimer);
      setFadeOut(true);
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play();
      }
    }, 6000);

    return () => {
      clearInterval(phraseTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#022d26] via-[#021b15] to-[#022d26] text-white font-sans overflow-hidden">
      {/* Ambient sound on fade */}
      <audio ref={audioRef} src="/public/fade-out.mp3" preload="auto" />

      {/* Animated Leaf Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-4xl text-emerald-400 mb-6"
      >
        <FaLeaf />
      </motion.div>

      {/* Animated Phrase */}
      <AnimatePresence mode="wait">
        <motion.p
          key={phraseIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-semibold text-emerald-100 drop-shadow-md tracking-wide select-none text-center px-6"
        >
          {phrases[phraseIndex]}
        </motion.p>
      </AnimatePresence>

      {/* Split overlays */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-emerald-500/10 backdrop-blur-sm z-40"
        initial="initial"
        animate="animate"
        variants={splitVariantsLeft}
      />
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/10 backdrop-blur-sm z-40"
        initial="initial"
        animate="animate"
        variants={splitVariantsRight}
      />

      {/* Fade out */}
      <AnimatePresence>
        {fadeOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-black z-50"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
