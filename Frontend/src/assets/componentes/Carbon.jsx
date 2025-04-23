import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Carbon = () => {
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Emissions (tCO₂)",
        data: [5.1, 4.8, 4.2, 4.0, 3.9, 3.7],
        borderColor: "#34D399",
        backgroundColor: "rgba(52, 211, 153, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#34D399"
      }
    ]
  };

  const pieData = {
    labels: ["Energy", "Transport", "Materials", "Waste"],
    datasets: [
      {
        label: "tCO₂",
        data: [14, 6, 4, 1],
        backgroundColor: [
          "rgba(52, 211, 153, 0.6)",
          "rgba(34, 197, 94, 0.6)",
          "rgba(74, 222, 128, 0.6)",
          "rgba(110, 231, 183, 0.6)"
        ],
        borderColor: "#1E1E1E"
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#A3A3A3"
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} tCO₂`
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#A3A3A3" },
        grid: { color: "#2F2F2F" }
      },
      y: {
        ticks: { color: "#A3A3A3" },
        grid: { color: "#2F2F2F" }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F0A] via-[#121212] to-[#1A1A1A] text-white flex font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-emerald-400">Carbon Analysis</h2>
            <p className="text-sm text-gray-400 mt-1">
              Track, break down and explore your emission data.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#1E1E1E] p-6 rounded-xl shadow-xl border border-white"
            >
              <h3 className="text-lg font-semibold text-white mb-4">📈 Emission Trends</h3>
              <div className="h-64">
                <Line data={lineData} options={chartOptions} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#1E1E1E] p-6 rounded-xl shadow-xl border border-emerald-500/20 flex flex-col justify-center"
            >
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 text-center">♻️ Emissions by Category</h3>
              <div className="h-64 max-w-sm mx-auto">
                <Pie data={pieData} options={{ responsive: true }} />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { label: "January", value: "5.1 tCO₂" },
              { label: "May", value: "3.9 tCO₂" },
              { label: "Change", value: "-23%" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.2 }}
                className="bg-[#1E1E1E] p-6 rounded-xl border border-emerald-500/30 hover:bg-emerald-950/40 transition-all"
              >
                <p className="text-sm text-gray-400">{item.label}</p>
                <h4 className="text-2xl font-extrabold text-emerald-300 mt-2">{item.value}</h4>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1E1E1E] p-6 rounded-xl shadow-xl border border-emerald-500/10"
          >
            <h3 className="text-lg font-semibold text-emerald-400 mb-3">⚙️ Emission Sources</h3>
            <p className="text-sm text-gray-400 mb-4">
              Here you'll be able to manage your data sources: APIs, manual entries and categorization by activity type.
            </p>
            <button className="px-4 py-2 text-sm bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-300 rounded-lg">
              + Add New Source
            </button>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Carbon;

