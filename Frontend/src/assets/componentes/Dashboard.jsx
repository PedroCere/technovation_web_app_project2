import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Dashboard = () => {
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
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#121212] to-[#1a1a1a] text-white flex font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-emerald-400 drop-shadow-md">
              Today
            </h2>
            <p className="text-gray-400 text-sm mt-1">{formattedDate}</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              { title: "Weekly Activity", value: "0%" },
              { title: "Project Worked", value: "02" }
            ].map((card, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg border border-[#2F2F2F] hover:scale-[1.02] transition-all duration-300 hover:shadow-emerald-500/30"
              >
                <p className="text-sm text-gray-400">{card.title}</p>
                <h3 className="text-3xl font-extrabold mt-2 text-emerald-400">
                  {card.value}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* Task Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "To Do",
                icon: "📝",
                color: "emerald",
                border: "border-emerald-400/20",
                tasks: [
                  "Calcular huella de carbono inicial",
                  "Agregar fuentes de emisión",
                  "Conectar APIs de consumo energético"
                ]
              },
              {
                title: "In Progress",
                icon: "⚙️",
                color: "lime",
                border: "border-lime-400/20",
                tasks: [
                  "Análisis predictivo de emisiones",
                  "Simulación de escenarios sostenibles",
                  "Cálculo del ahorro de CO₂",
                  "Visualización de tendencias"
                ]
              },
              {
                title: "Done",
                icon: "✅",
                color: "green",
                border: "border-green-400/20",
                tasks: [
                  "Auditoría ambiental automatizada",
                  "Configuración del perfil de la empresa"
                ]
              }
            ].map((col, i) => (
              <motion.section
                key={col.title}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className={`bg-[#1E1E1E] p-6 rounded-xl border ${col.border} shadow-lg hover:shadow-${col.color}-400/30 transition-all`}
              >
                <h4
                  className={`text-xl font-bold mb-4 text-${col.color}-300 flex items-center gap-2`}
                >
                  <span>{col.icon}</span> {col.title}
                </h4>
                <ul className="space-y-4">
                  {col.tasks.map((task, idx) => (
                    <motion.li
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      className={`bg-[#252525] p-4 rounded-lg border border-${col.color}-400/10 hover:shadow-${col.color}-400/20 transition-all`}
                    >
                      <h5 className="font-medium text-gray-100">{task}</h5>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
