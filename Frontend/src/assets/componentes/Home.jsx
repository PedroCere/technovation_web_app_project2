import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registro completo de componentes Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Home = () => {
  const chartRef = useRef(null);

  // Configuración del gráfico con nueva paleta
  const chartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
      label: 'Reducción de CO₂ (ton)',
      data: [15, 12, 8, 5, 3],
      borderColor: '#47D95D',
      backgroundColor: 'rgba(71, 217, 93, 0.2)',
      borderWidth: 3,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#34C464',
      pointRadius: 5,
      pointHoverRadius: 8
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: '#333333',
        titleColor: '#34C464',
        bodyColor: '#FFFFFF',
        borderColor: '#47D95D',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        grid: {
          color: '#333333',
          drawBorder: false
        },
        ticks: {
          color: '#FFFFFF'
        }
      },
      x: {
        grid: {
          color: '#333333',
          drawBorder: false
        },
        ticks: {
          color: '#FFFFFF'
        }
      }
    }
  };

  const features = [
    {
      icon: '📈',
      title: 'Análisis Predictivo',
      description: 'Modelos de IA que anticipan tus emisiones'
    },
    {
      icon: '🌱',
      title: 'Sostenibilidad',
      description: 'Soluciones alineadas con objetivos Net Zero'
    },
    {
      icon: '🔄',
      title: 'Optimización',
      description: 'Reducción continua de tu huella ambiental'
    }
  ];

  return (
    <div className="min-h-screen bg-[#004900] text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center overflow-hidden">
        {/* Efecto de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSg1MiwgMjE3LCA5MywgMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#34C464] to-[#47D95D] bg-clip-text text-transparent">
              Revoluciona
            </span> tu impacto ambiental
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 max-w-3xl mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            La solución definitiva para gestionar y reducir tu huella de carbono con tecnología de vanguardia
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button className="bg-gradient-to-r from-[#34C464] to-[#47D95D] px-8 py-4 text-lg font-semibold text-[#004900] rounded-xl hover:shadow-lg hover:shadow-[#34C464]/30 transition-all transform hover:-translate-y-1">
              Comienza ahora →
            </button>
          </motion.div>
        </motion.div>

        {/* Gráfico */}
        <motion.div 
          className="mt-16 w-full max-w-4xl bg-[#002800]/50 backdrop-blur-sm p-6 rounded-2xl border border-[#34C464]/30 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="h-64">
            <Line 
              ref={chartRef}
              data={chartData} 
              options={chartOptions}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto bg-[#002800]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-[#34C464] to-[#47D95D] bg-clip-text text-transparent">
              Tecnología
            </span> para un futuro sostenible
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#004900] p-8 rounded-xl border border-[#333333] hover:border-[#47D95D] transition-all group"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-6 group-hover:text-[#47D95D] transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#34C464]">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-4 bg-gradient-to-br from-[#004900] to-[#002800] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSg1MiwgMjE3LCA5MywgMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
        </div>
        
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Preparado para liderar el cambio <span className="text-[#47D95D]">sostenible</span>?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Únete a las empresas que ya están transformando su operación con nuestra plataforma
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-gradient-to-r from-[#34C464] to-[#47D95D] px-8 py-4 text-lg font-semibold text-[#004900] rounded-xl hover:shadow-lg hover:shadow-[#34C464]/30 transition-all">
              Solicitar demo
            </button>
            <button className="px-8 py-4 text-lg font-semibold text-white border-2 border-[#47D95D] rounded-xl hover:bg-[#47D95D]/10 transition-all">
              Conocer más
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;