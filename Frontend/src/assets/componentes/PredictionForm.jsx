import React, { useState } from "react";
import { submitPrediction } from "../../utils/api";
import { motion } from "framer-motion";
import { FaMagic } from "react-icons/fa";

const PredictionForm = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const userId = "123e4567-e89b-12d3-a456-426614174345";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg("");

    try {
      const response = await submitPrediction({ userId, prompt });
      setSuccessMsg("Prediction submitted successfully! 🚀");
      setPrompt("");
    } catch (err) {
      setError(err.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1E1E1E] p-6 md:p-8 rounded-xl shadow-2xl border border-emerald-500/20 w-full mt-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <FaMagic className="text-emerald-400 text-xl" />
        <h2 className="text-lg font-semibold text-white">AI Prediction Prompt</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Describe your prediction prompt:
          </label>
          <textarea
            id="prompt"
            name="prompt"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full rounded-lg border border-gray-700 p-3 bg-[#2A2A2A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            placeholder="e.g. Forecast CO₂ emissions for Q4 based on energy usage..."
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {successMsg && <p className="text-sm text-emerald-400">{successMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-all"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Prediction"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default PredictionForm;
