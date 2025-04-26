import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      setDarkMode(savedMode === 'dark');
      applyTheme(savedMode === 'dark');
    }
  }, []);

  const applyTheme = (isDark) => {
    document.documentElement.classList.add('theme-transition');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 400);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    applyTheme(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <motion.div
      initial={{ backgroundColor: darkMode ? "#0A0F0A" : "#e6f7ec" }}
      animate={{ backgroundColor: darkMode ? "#0A0F0A" : "#e6f7ec" }}
      transition={{ duration: 0.6 }}
      className="transition-colors min-h-screen flex flex-col font-sans text-gray-900 dark:text-white"
    >
      {/* Toggle Theme Button */}
      <motion.button
        onClick={toggleDarkMode}
        whileTap={{ rotate: 360 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="fixed top-6 right-6 bg-emerald-500 text-white p-3 rounded-full shadow-lg hover:bg-emerald-600 transition-all z-50"
        title="Toggle Theme"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </motion.button>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6 py-32 md:py-40">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight"
        >
          Empowering a <span className="text-emerald-500">Greener Future</span> with Oxi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl max-w-3xl text-gray-600 dark:text-gray-300 mb-12"
        >
          Intelligent tools to measure, predict, and reduce your carbon footprint.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetStarted}
          className="px-8 py-4 bg-emerald-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-emerald-600 transition-all"
        >
          Get Started
        </motion.button>
      </div>

      {/* Features Section */}
      <section className="px-6 py-24 bg-[#f0fdf4] dark:bg-[#111]">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-4xl md:text-5xl font-bold mb-20"
        >
          Why Choose <span className="text-emerald-500">Oxi?</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { icon: "🤖", title: "AI-Powered Insights", description: "Real-time analytics for Scope 1, 2 & 3 emissions." },
            { icon: "📊", title: "Actionable Strategies", description: "Personalized plans based on your carbon data." },
            { icon: "🌍", title: "Global Compliance", description: "Aligned with GHG Protocol, EU Taxonomy and UN Goals." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 shadow-lg hover:shadow-emerald-200 dark:hover:shadow-emerald-800 transition-all flex flex-col items-center text-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-emerald-600 mb-3">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h3 className="uppercase text-emerald-500 tracking-wider text-sm mb-4">What Our Clients Say</h3>
          <h2 className="text-4xl font-bold mb-10">Trusted by Sustainable Leaders</h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-[#1A1A1A] p-10 rounded-2xl shadow-lg"
          >
            <p className="text-xl italic text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              "Oxi transformed our sustainability efforts. We achieved a 15% reduction in emissions within three months!"
            </p>
            <div className="font-semibold text-emerald-600">- Sustainability Director, Tech500 Company</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-emerald-50 dark:bg-[#111] py-24 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-8"
        >
          Join the Movement for a Cleaner Tomorrow
        </motion.h2>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Get started today and lead your company towards carbon neutrality with Oxi’s powerful tools.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            className="px-10 py-4 bg-emerald-500 text-white rounded-full text-lg font-semibold shadow-md hover:bg-emerald-600 transition-all"
          >
            Request Demo
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/about')}
            className="px-10 py-4 border-2 border-emerald-500 text-emerald-600 rounded-full text-lg font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/20 transition-all"
          >
            Learn More
          </motion.button>
        </div>
      </section>

    </motion.div>
  );
};

export default Home;
