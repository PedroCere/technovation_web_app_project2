import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { fetchEmissionData } from "../../utils/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const Carbon = () => {
  const [emissionData, setEmissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = "123e4567-e89b-12d3-a456-426614174345";

  useEffect(() => {
    fetchEmissionData(userId)
      .then(data => {
        console.log("✔ Emission data:", data);
        setEmissionData(data);
      })
      .catch(err => {
        console.error("❌ Error fetching emissions:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-white p-6">Loading emission data...</p>;
  }

  if (!emissionData || !emissionData.breakdown) {
    return <p className="text-white p-6">No emission data available.</p>;
  }

  const { totalEmissionKg, breakdown } = emissionData;

  const pieData = {
    labels: Object.keys(breakdown),
    datasets: [
      {
        label: "Emissions (kg)",
        data: Object.values(breakdown),
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
              Emissions breakdown for your organization.
            </p>
          </motion.div>

          {/* Emissions Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1E1E1E] p-6 rounded-xl shadow-xl border border-emerald-500/20 mb-8"
          >
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">📦 Total Emissions</h3>
            <p className="text-4xl font-bold text-emerald-300">
              {(totalEmissionKg / 1000).toFixed(2)} tCO₂
            </p>
          </motion.div>

          {/* Emissions by Category (Pie + List) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#1E1E1E] p-6 rounded-xl shadow-xl border border-emerald-500/20"
            >
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 text-center">♻️ Emissions by Category</h3>
              <div className="h-64 max-w-sm mx-auto">
                <Pie data={pieData} options={{ responsive: true }} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#1E1E1E] p-6 rounded-xl shadow-xl border border-emerald-500/20"
            >
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">📊 Category Breakdown</h3>
              <ul className="space-y-3">
                {Object.entries(breakdown).map(([category, value], i) => (
                  <li key={i} className="flex justify-between text-sm text-gray-300 border-b border-emerald-800/30 pb-2">
                    <span>{category}</span>
                    <span>{value.toFixed(1)} kg CO₂</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Carbon;
