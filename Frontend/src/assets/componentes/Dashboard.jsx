import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

const Dashboard = () => {

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);


const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "CO₂ Emissions (tons)",
      data: [4.2, 3.9, 3.7, 3.5, 3.3, 3.0],
      fill: true,
      backgroundColor: "rgba(52, 211, 153, 0.1)",
      borderColor: "#34D399",
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: "#34D399"
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#A3A3A3",
        font: { size: 12 }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: "#A3A3A3"
      },
      grid: {
        color: "#2F2F2F"
      }
    },
    y: {
      ticks: {
        color: "#A3A3A3"
      },
      grid: {
        color: "#2F2F2F"
      }
    }
  }
};


  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.2, 
        duration: 0.6, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    })
  };

  const taskItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F0A] via-[#121212] to-[#1A1A1A] text-white flex font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 md:mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Sustainability Dashboard
            </h2>
            <p className="text-sm md:text-base text-emerald-200/80 mt-2">
              {formattedDate}
            </p>
          </motion.div>

   

          {/* Task Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
            {[
              {
                title: "To Do",
                icon: "📌",
                color: "emerald",
                tasks: [
                  "Calculate initial carbon footprint",
                  "Add emission sources",
                  "Connect energy consumption APIs"
                ]
              },
              {
                title: "In Progress",
                icon: "⚡",
                color: "emerald",
                tasks: [
                  "Predictive emissions analysis",
                  "Sustainable scenario simulation",
                  "CO₂ savings calculation",
                  "Trend visualization"
                ]
              },
              {
                title: "Completed",
                icon: "✅",
                color: "emerald",
                tasks: [
                  "Automated environmental audit",
                  "Company profile setup"
                ]
              }
            ].map((col, i) => (
              <motion.section
                key={col.title}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className={`bg-[#1E1E1E] p-5 md:p-6 rounded-xl border border-emerald-500/30 shadow-xl hover:shadow-emerald-400/30 transition-all`}
              >
                <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-emerald-400 flex items-center gap-2">
                  <span>{col.icon}</span>
                  {col.title}
                  <span className="text-sm ml-auto text-emerald-300">
                    {col.tasks.length}
                  </span>
                </h4>
                <ul className="space-y-2 md:space-y-3">
                  {col.tasks.map((task, idx) => (
                    <motion.li
                      key={idx}
                      variants={taskItemVariants}
                      whileHover={{ x: 5, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-3 md:p-4 rounded-lg bg-[#252525] border border-emerald-400/10 hover:border-emerald-400/30 transition-all cursor-pointer"
                    >
                      <h5 className="text-sm md:text-base font-medium text-gray-100">
                        {task}
                      </h5>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
  
  {/* AI Recommendations */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="bg-[#1E1E1E] p-6 rounded-xl shadow-xl hover:bg-emerald-950/50 transition-colors duration-300"
    >
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-emerald-400/10 rounded-lg">
        <span className="text-2xl">🤖</span>
      </div>
      <h3 className="text-lg font-semibold text-emerald-400">
        AI Recommendations
      </h3>
    </div>
    <p className="text-sm text-emerald-100/80 mb-4">
      Suggested optimization: implement a smart energy management system. Estimated reduction: 18–23% in annual CO₂ emissions.
    </p>
    <div className="flex gap-2">
      <button className="px-3 py-1.5 text-xs bg-emerald-400/20 hover:bg-emerald-400/30 text-emerald-300 rounded-md transition-all">
        View details
      </button>
      <button className="px-3 py-1.5 text-xs border border-emerald-400/20 hover:border-emerald-400/40 text-emerald-300 rounded-md transition-all">
        Action plan
      </button>
    </div>
  </motion.div>

  {/* Environmental Progress */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className="bg-[#1E1E1E] p-6 rounded-xl shadow-xl hover:bg-emerald-950/50 transition-colors duration-300"
    >
    <h3 className="text-lg font-semibold text-emerald-400 mb-4">
      🌱 Environmental Progress
    </h3>
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Net Zero Goal</span>
          <span>23%</span>
        </div>
        <div className="h-2 bg-emerald-900/30 rounded-full overflow-hidden">
          <div className="w-1/4 bg-emerald-400 h-full transition-all duration-500" />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>CO₂ Monthly Reduction</span>
          <span>1.2 t</span>
        </div>
        <div className="h-2 bg-emerald-900/30 rounded-full overflow-hidden">
          <div className="w-1/3 bg-emerald-400 h-full transition-all duration-500" />
        </div>
      </div>
    </div>
  </motion.div>

  {/* Alerts */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="bg-[#1E1E1E] p-6 rounded-xl shadow-xl hover:bg-emerald-950/50 transition-colors duration-300"
    >
    <h3 className="text-lg font-semibold text-rose-400 mb-3">
      ⚠️ Important Alerts
    </h3>
    <ul className="text-sm space-y-2">
      <li className="flex items-center gap-2 text-rose-300/90">
        <span>●</span> Upcoming audit in 15 days
      </li>
      <li className="flex items-center gap-2 text-amber-300/90">
        <span>●</span> 3 suppliers are non-sustainable
      </li>
      <li className="flex items-center gap-2 text-emerald-300/90">
        <span>●</span> New carbon credits available
      </li>
    </ul>
  </motion.div>
</div>

          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-[#1E1E1E] p-6 rounded-xl shadow-xl border border-green"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              📊 Emission Trends
            </h3>
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;