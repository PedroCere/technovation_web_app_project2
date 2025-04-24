import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Carbon = () => {
  const [breakdown, setBreakdown] = useState({
    Energy: 615,
    Transport: 265,
    Materials: 225
  });

  const pieData = {
    labels: Object.keys(breakdown),
    datasets: [
      {
        data: Object.values(breakdown),
        backgroundColor: ["#34D399", "#4ADE80", "#10B981"],
        borderColor: "#1F2937",
        borderWidth: 2
      }
    ]
  };

  const simulatedMonthlyData = {
    Energy: [580, 610, 620, 590, 600, 615],
    Transport: [300, 310, 290, 280, 275, 265],
    Materials: [250, 245, 240, 238, 230, 225]
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const barData = {
    labels: months,
    datasets: Object.entries(simulatedMonthlyData).map(([label, data], idx) => ({
      label,
      data,
      backgroundColor: ["#34D39999", "#4ADE8099", "#10B98199"][idx],
      borderRadius: 4
    }))
  };

  const topCategory = Object.entries(breakdown).reduce(
    (prev, current) => (current[1] > prev[1] ? current : prev),
    ["", 0]
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#0A0F0A] via-[#121212] to-[#1A1A1A] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-6 md:p-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-8"
          >
            Carbon Analysis
          </motion.h2>

          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1E1E1E] p-6 rounded-xl shadow-xl border border-emerald-500/20 md:w-1/2"
            >
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">🌍 Emissions by Category</h3>
              <div className="h-72">
                <Pie data={pieData} />
              </div>
            </motion.div>

            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1E1E1E] p-6 mt-8 md:mt-0 rounded-xl shadow-xl border border-emerald-500/20 md:w-1/2"
            >
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">📅 Emissions per Month (Simulated)</h3>
              <div className="h-64">
                <Bar
                  data={barData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        labels: { color: "#CCCCCC" }
                      }
                    },
                    scales: {
                      y: {
                        ticks: { color: "#CCCCCC" },
                        grid: { color: "#2F2F2F" }
                      },
                      x: {
                        ticks: { color: "#CCCCCC" },
                        grid: { color: "#2F2F2F" }
                      }
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* TOP CATEGORY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-[#1F1F1F] p-4 rounded-lg border border-emerald-400/10"
          >
            <p className="text-sm text-gray-400 mb-1">🏆 Top Emission Category</p>
            <h4 className="text-xl font-bold text-emerald-300">{topCategory[0]}</h4>
            <p className="text-xs text-gray-500 mt-1">
              {topCategory[1].toFixed(1)} kg CO₂ emitted
            </p>
          </motion.div>

          {/* SUMMARY STATISTICS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 bg-[#1F1F1F] p-6 rounded-lg border border-emerald-400/10 shadow"
          >
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">📊 Summary Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div>
                <p className="text-sm">Total Emissions</p>
                <p className="text-2xl font-bold text-emerald-300">
                  {Object.values(breakdown).reduce((a, b) => a + b, 0).toFixed(1)} kg CO₂
                </p>
              </div>
              <div>
                <p className="text-sm">Average Monthly Emissions (Simulated)</p>
                <p className="text-2xl font-bold text-emerald-300">
                  {(
                    Object.values(simulatedMonthlyData).reduce(
                      (sum, arr) => sum + arr.reduce((a, b) => a + b, 0),
                      0
                    ) /
                    (months.length * Object.keys(simulatedMonthlyData).length)
                  ).toFixed(1)}{" "}
                  kg CO₂
                </p>
              </div>
            </div>
          </motion.div>

          {/* EMISSION REDUCTION TIPS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 bg-[#1F1F1F] p-6 rounded-lg border border-emerald-400/10 shadow"
          >
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">🧰 Emission Reduction Tips</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Reduce energy consumption by using energy-efficient appliances.</li>
              <li>Use public transport, carpool, or bike instead of driving alone.</li>
              <li>Recycle and reuse materials to minimize waste.</li>
              <li>Support renewable energy sources whenever possible.</li>
              <li>Monitor and optimize your carbon footprint regularly.</li>
            </ul>
          </motion.div>

          {/* ADDITIONAL CHART: Line Chart of Total Monthly Emissions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 bg-[#1E1E1E] p-6 rounded-xl shadow-xl border border-emerald-500/20"
          >
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">📈 Total Monthly Emissions (Simulated)</h3>
            <div className="h-64">
              <Bar
                data={{
                  labels: months,
                  datasets: [
                    {
                      label: "Total Emissions",
                      data: months.map(
                        (_, i) =>
                          simulatedMonthlyData.Energy[i] +
                          simulatedMonthlyData.Transport[i] +
                          simulatedMonthlyData.Materials[i]
                      ),
                      borderColor: "#34D399",
                      backgroundColor: "rgba(52, 211, 153, 0.5)",
                      fill: true,
                      tension: 0.3,
                      borderWidth: 2,
                      pointRadius: 3
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      labels: { color: "#CCCCCC" }
                    }
                  },
                  scales: {
                    y: {
                      ticks: { color: "#CCCCCC" },
                      grid: { color: "#2F2F2F" }
                    },
                    x: {
                      ticks: { color: "#CCCCCC" },
                      grid: { color: "#2F2F2F" }
                    }
                  }
                }}
                type="line"
              />
            </div>
          </motion.div>

          {/* DATA SOURCES & METHODOLOGY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 bg-[#1F1F1F] p-6 rounded-lg border border-emerald-400/10 shadow text-gray-400 text-sm"
          >
            <h3 className="text-lg font-semibold text-emerald-400 mb-2">ℹ️ Data Sources & Methodology</h3>
            <p>
              The emissions data is simulated for demonstration purposes. Real data is sourced from verified environmental databases and calculated using standard carbon footprint methodologies.
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Carbon;
