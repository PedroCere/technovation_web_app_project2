import React, { useState } from "react";
import { submitPrediction } from "../../utils/api";

const PredictionForm = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = "123e4567-e89b-12d3-a456-426614174345"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await submitPrediction({
        userId,
        prompt,
      });
      console.log("Prediction response:", response);
      setPrompt("");
    } catch (err) {
      setError(err.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-xl mx-auto">
      <label htmlFor="prompt" className="block text-sm font-medium text-white mb-2">
        Enter your prediction prompt:
      </label>
      <textarea
        id="prompt"
        name="prompt"
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full rounded-sm border border-gray-600 p-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
        placeholder="Type your prediction prompt here..."
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:opacity-50 transition-colors"
      >
        {loading ? "Submitting..." : "Submit Prediction"}
      </button>
    </form>
  );
};

export default PredictionForm;
