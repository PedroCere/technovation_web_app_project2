import { motion } from "framer-motion";

export default function Loading({ enableSound }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#0A0F0A] text-white">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0.8, 1.1, 0.9, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-6xl mb-6"
      >
        🌱
      </motion.div>
      <div className="flex flex-col items-center">
        <p className="text-lg mb-4">Enable sounds to enhance your experience</p>
        <button
          onClick={enableSound}
          className="px-6 py-3 bg-emerald-500 rounded-md text-white font-semibold hover:bg-emerald-600 transition"
        >
          Enable Sounds
        </button>
      </div>
    </div>
  );
}
