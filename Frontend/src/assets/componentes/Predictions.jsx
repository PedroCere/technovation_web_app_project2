import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Filler
} from "chart.js";
import { getPredictionsByUser, deletePrediction } from "../../utils/api";
import PredictionForm from "./PredictionForm";
import PredictionsLoading from "./PredictionsLoading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Filler
);

const Predictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloading, setReloading] = useState(false);
  const [showLoadingTransition, setShowLoadingTransition] = useState(true);
  const userId = "123e4567-e89b-12d3-a456-426614174345";

  const fetchPredictions = async () => {
    setReloading(true);
    try {
      const data = await getPredictionsByUser(userId);
      setPredictions(data);
    } catch (err) {
      toast.error("Failed to fetch predictions");
    } finally {
      setReloading(false);
    }
  };

  useEffect(() => {
    getPredictionsByUser(userId)
      .then(setPredictions)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleLoadingComplete = () => {
    setShowLoadingTransition(false);
  };

  const handleDelete = async (id) => {
    try {
      await deletePrediction(id);
      setPredictions((prev) => prev.filter((p) => p.id !== id));
      toast.success("Prediction deleted 🌱");
    } catch {
      toast.error("Failed to delete prediction");
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#CCCCCC",
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: "#1E1E1E",
        titleColor: "#34C464",
        bodyColor: "#FFFFFF",
        borderColor: "#47D95D",
        borderWidth: 1
      }
    },
    scales: {
      y: {
        grid: { color: "#2D2D2D" },
        ticks: { color: "#CCCCCC" },
        title: {
          display: true,
          text: "Tons of CO₂",
          color: "#CCCCCC"
        }
      },
      x: {
        grid: { color: "#2D2D2D" },
        ticks: { color: "#CCCCCC" }
      }
    }
  };

  const lineData = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Forecasted Emissions (tCO₂)",
        data: [3.5, 3.3, 3.0, 2.9, 2.7, 2.5],
        borderColor: "#34D399",
        backgroundColor: "rgba(52, 211, 153, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 8,
        borderWidth: 2
      }
    ]
  };

  const barData = {
    labels: ["Energy", "Transport", "Materials", "Waste"],
    datasets: [
      {
        label: "Projected Emissions",
        data: [11, 5, 2, 1],
        backgroundColor: [
          "rgba(52, 211, 153, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(74, 222, 128, 0.8)",
          "rgba(110, 231, 183, 0.8)"
        ],
        borderColor: "#34C464",
        borderWidth: 1,
        borderRadius: 4
      }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  if (loading || showLoadingTransition) {
    return <PredictionsLoading onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F0A] via-[#121212] to-[#1A1A1A] text-white flex font-sans">
      <Sidebar />
      <ToastContainer theme="dark" position="top-right" />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <motion.main
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex-1 p-6 md:p-8 overflow-y-auto"
        >
          <motion.div variants={itemVariants} className="mt-15 mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                Emissions Forecast
              </h2>
              <p className="text-sm md:text-base text-emerald-200/80 mt-2">
                AI-powered predictive models for smart emissions management
              </p>
            </div>

            <button
              onClick={fetchPredictions}
              disabled={reloading}
              className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${
                reloading ? "text-gray-500" : "text-emerald-300 hover:bg-emerald-500/10"
              }`}
            >
              {reloading ? "Reloading..." : "🔄 Reload"}
            </button>
          </motion.div>

          <PredictionForm />

          <motion.div
            variants={itemVariants}
            className="bg-[#1E1E1E] p-6 rounded-xl shadow-2xl border border-emerald-400/20 mt-10"
          >
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">Your Predictions</h3>
            {predictions.length === 0 ? (
              <p className="text-gray-400">No predictions available.</p>
            ) : (
              <ul className="space-y-3">
                <AnimatePresence>
                  {predictions.map((pred) => (
                    <motion.li
                      key={pred.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="bg-[#2D2D2D] p-6 rounded-lg border border-emerald-500/30 shadow-md hover:shadow-emerald-400/50 transition-shadow duration-300 flex justify-between items-start gap-4"
                    >
                      <div>
                        <p className="text-md text-gray-300 font-semibold mb-1">Prediction:</p>
                        <p className="text-sm text-gray-200 mb-2">{pred.prediction}</p>
                        <p className="text-xs text-gray-500 italic">
                          Date: {new Date(pred.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(pred.id)}
                        className="text-sm text-rose-400 hover:text-rose-500 transition"
                      >
                        🗑️
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </motion.div>

          
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
            <motion.div className="bg-[#1E1E1E] p-6 rounded-xl shadow-2xl border border-emerald-400/20">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">📉 Emission Trends</h3>
              <div className="h-64">
                <Line data={lineData} options={chartOptions} />
              </div>
            </motion.div>

            <motion.div className="bg-[#1E1E1E] p-6 rounded-xl shadow-2xl border border-emerald-400/20">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">📊 Emissions by Source</h3>
              <div className="h-64">
                <Bar data={barData} options={chartOptions} />
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#1E1E1E] mt-10 p-6 rounded-xl border border-emerald-400/20">
            <h3 className="text-lg font-semibold text-emerald-400 mb-3">🤖 AI Recommendations</h3>
            <ul className="list-disc pl-5 text-sm text-emerald-100 space-y-2">
              <li>Implement smart energy management system</li>
              <li>Switch to certified renewable energy providers</li>
              <li>Optimize transport routes using AI</li>
              <li>Launch advanced material recycling program</li>
            </ul>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
};

export default Predictions;
