import React, { useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
} from "chart.js";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FaLeaf } from "react-icons/fa";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

// === Data setup ===
const breakdown = {
  Energy: 615,
  Transport: 265,
  Materials: 225
};

const monthlyData = {
  Energy: [580, 610, 620, 590, 600, 615],
  Transport: [300, 310, 290, 280, 275, 265],
  Materials: [250, 245, 240, 238, 230, 225]
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const colors = ["#34D399", "#4ADE80", "#10B981"];

// === Chart data ===
const getPieData = () => ({
  labels: Object.keys(breakdown),
  datasets: [{
    data: Object.values(breakdown),
    backgroundColor: colors,
    borderColor: "#1F2937",
    borderWidth: 2
  }]
});

const getBarData = () => ({
  labels: months,
  datasets: Object.entries(monthlyData).map(([label, data], idx) => ({
    label,
    data,
    backgroundColor: `${colors[idx]}99`,
    borderRadius: 6
  }))
});

const getLineData = () => ({
  labels: months,
  datasets: [{
    label: "Total Emissions",
    data: months.map((_, i) =>
      Object.values(monthlyData).reduce((sum, arr) => sum + arr[i], 0)
    ),
    borderColor: colors[0],
    backgroundColor: "rgba(52, 211, 153, 0.3)",
    fill: true,
    tension: 0.4,
    borderWidth: 2,
    pointBackgroundColor: colors[0]
  }]
});

// === Computed values ===
const topCategory = Object.entries(breakdown).reduce(
  (max, curr) => curr[1] > max[1] ? curr : max,
  ["", 0]
);

const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
const monthlyAverage = (
  Object.values(monthlyData).flat().reduce((a, b) => a + b, 0) /
  (months.length * Object.keys(monthlyData).length)
);

const Carbon = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#0A0F0A] via-[#121212] to-[#1A1A1A] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 md:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <FaLeaf className="text-3xl text-emerald-400 animate-pulse" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Carbon Analysis Dashboard
            </h2>
          </motion.div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1E1E1E] p-6 rounded-xl shadow-xl border border-emerald-500/20"
            >
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">🌍 Emissions by Category</h3>
              <div className="h-72">
                <Pie data={getPieData()} />
              </div>
            </motion.div>

            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#1E1E1E] p-6 rounded-xl shadow-xl border border-emerald-500/20"
            >
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">📅 Emissions per Month</h3>
              <div className="h-64">
                <Bar
                  data={getBarData()}
                  options={{
                    responsive: true,
                    plugins: { legend: { labels: { color: "#CCCCCC" } } },
                    scales: {
                      y: { ticks: { color: "#CCCCCC" }, grid: { color: "#2F2F2F" } },
                      x: { ticks: { color: "#CCCCCC" }, grid: { color: "#2F2F2F" } }
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Summary Sections */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 bg-[#1F1F1F] p-4 rounded-lg border border-emerald-400/10"
          >
            <p className="text-sm text-gray-400 mb-1">🏆 Top Emission Category</p>
            <h4 className="text-xl font-bold text-emerald-300">{topCategory[0]}</h4>
            <p className="text-xs text-gray-500 mt-1">{topCategory[1].toFixed(1)} kg CO₂ emitted</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 bg-[#1F1F1F] p-6 rounded-lg border border-emerald-400/10 shadow"
          >
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">📊 Summary</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <p className="text-sm">Total Emissions</p>
                <p className="text-2xl font-bold text-emerald-300">{total.toFixed(1)} kg CO₂</p>
              </div>
              <div>
                <p className="text-sm">Average Monthly Emissions</p>
                <p className="text-2xl font-bold text-emerald-300">{monthlyAverage.toFixed(1)} kg CO₂</p>
              </div>
            </div>
          </motion.div>

          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6 bg-[#1E1E1E] p-6 rounded-xl shadow-xl border border-emerald-500/20"
          >
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">📈 Total Emissions Over Time</h3>
            <div className="h-64">
              <Line
                data={getLineData()}
                options={{
                  responsive: true,
                  plugins: { legend: { labels: { color: "#CCCCCC" } } },
                  scales: {
                    y: { ticks: { color: "#CCCCCC" }, grid: { color: "#2F2F2F" } },
                    x: { ticks: { color: "#CCCCCC" }, grid: { color: "#2F2F2F" } }
                  }
                }}
              />
            </div>
          </motion.div>

          {/* Tips & Sources */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-6 bg-[#1F1F1F] p-6 rounded-lg border border-emerald-400/10 shadow"
          >
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">🧰 Reduction Tips</h3>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2">
              <li>Use energy-efficient lighting and appliances.</li>
              <li>Walk, cycle, or use public transport.</li>
              <li>Reuse and recycle packaging and materials.</li>
              <li>Switch to renewable energy providers.</li>
              <li>Regularly monitor and reduce your carbon impact.</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 bg-[#1F1F1F] p-6 rounded-lg border border-emerald-400/10 shadow text-sm text-gray-400"
          >
            <h3 className="text-lg font-semibold text-emerald-400 mb-2">ℹ️ Data Sources & Methodology</h3>
            <p>
              The emissions shown are simulated for visualization purposes. Real-world versions use official databases like GHG Protocol, CO₂Signal, and industry emission factors.
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Carbon;
