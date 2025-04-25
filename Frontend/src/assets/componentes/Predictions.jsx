import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
import { getPredictionsByUser } from "../../utils/api";
import PredictionForm from "./PredictionForm";
import PredictionsLoading from "./PredictionsLoading";

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
  const [showLoadingTransition, setShowLoadingTransition] = useState(true);
  const userId = "123e4567-e89b-12d3-a456-426614174345";

  useEffect(() => {
    getPredictionsByUser(userId)
      .then(setPredictions)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleLoadingComplete = () => {
    setShowLoadingTransition(false);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#CCCCCC',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: '#1E1E1E',
        titleColor: '#34C464',
        bodyColor: '#FFFFFF',
        borderColor: '#47D95D',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        grid: { color: '#2D2D2D' },
        ticks: { color: '#CCCCCC' },
        title: {
          display: true,
          text: 'Tons of CO₂',
          color: '#CCCCCC'
        }
      },
      x: {
        grid: { color: '#2D2D2D' },
        ticks: { color: '#CCCCCC' }
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
    visible: { opacity: 1, y: 0 }
  };

  if (loading || showLoadingTransition) {
    return <PredictionsLoading onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F0A] via-[#121212] to-[#1A1A1A] text-white flex font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <motion.main
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex-1 p-6 md:p-8 overflow-y-auto"
        >
          <motion.div variants={itemVariants}>
            <motion.div variants={itemVariants} className="mt-15 mb-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                Emissions Forecast
              </h2>
              <p className="text-sm md:text-base text-emerald-200/80 mt-2">
                AI-powered predictive models for smart emissions management
              </p>
            </motion.div>

            <PredictionForm />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-[#1E1E1E] p-6 rounded-xl shadow-2xl border border-emerald-400/20 mt-10"
          >
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">Your Predictions</h3>
            {predictions.length === 0 ? (
              <p className="text-gray-400">No predictions available.</p>
            ) : (
              <ul className="space-y-3">
                {predictions.map((pred) => (
                  <li
                    key={pred.id}
                    className="bg-[#2D2D2D] p-6 rounded-lg border border-emerald-500/30 shadow-md hover:shadow-emerald-400/50 transition-shadow duration-300"
                  >
                    <p className="text-md text-gray-300 font-semibold mb-1">Prediction:</p>
                    <p className="text-sm text-gray-200 mb-2">{pred.prediction}</p>
                    <p className="text-xs text-gray-500 italic">
                      Date: {new Date(pred.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            </h2>
            <p className="text-sm md:text-base text-emerald-200/80 mt-2">
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <motion.div variants={itemVariants} className="bg-[#1E1E1E] p-6 rounded-xl shadow-2xl border border-emerald-400/20">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <span>📉</span> Emission Trends
              </h3>
              <div className="h-64">
                <Line data={lineData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: '6-Month Forecast', color: '#CCCCCC', font: { size: 14 } } } }} />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#1E1E1E] p-6 rounded-xl shadow-2xl border border-emerald-400/20">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <span>📊</span> Emissions by Source
              </h3>
              <div className="h-64">
                <Bar data={barData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Category Breakdown', color: '#CCCCCC', font: { size: 14 } } } }} />
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="bg-[#1E1E1E] p-6 rounded-xl shadow-2xl border border-emerald-400/20">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                  <span>🤖</span> AI Recommendations
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-emerald-100/90">
                  <li>Implement smart energy management system</li>
                  <li>Switch to certified renewable energy providers</li>
                  <li>Optimize transport routes using AI</li>
                  <li>Launch advanced material recycling program</li>
                </ul>
              </div>
              <div className="w-full md:w-64 space-y-4">
                <div className="p-4 rounded-lg bg-emerald-400/10">
                  <p className="text-xs text-emerald-300 mb-1">Estimated Impact</p>
                  <p className="text-xl font-bold text-emerald-400">23–28%</p>
                  <p className="text-xs text-emerald-300">Emission reduction</p>
                </div>
                <button className="w-full px-4 py-2 text-sm bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-300 rounded-lg transition-all flex items-center gap-2">
                  <span>📄</span> Detailed Action Plan
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { title: "Current Scenario", value: "2.7t", color: "bg-rose-400/10", text: "text-rose-400" },
              { title: "2024 Target", value: "1.9t", color: "bg-emerald-400/10", text: "text-emerald-400" },
              { title: "Net Zero Target", value: "2028", color: "bg-indigo-400/10", text: "text-indigo-400" }
            ].map((card, index) => (
              <div key={index} className={`p-4 rounded-xl ${card.color} border border-emerald-400/10`}>
                <p className="text-sm text-gray-300 mb-1">{card.title}</p>
                <p className={`text-2xl font-bold ${card.text}`}>{card.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
};

export default Predictions;
