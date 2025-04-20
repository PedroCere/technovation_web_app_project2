import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#004900] to-[#002800] text-white">
      {/* Hero Section - Más grande con más espacio */}
      <section className="container mx-auto px-6 py-32 md:py-40 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10"
        >
          <span className="bg-gradient-to-r from-[#34C464] to-[#47D95D] bg-clip-text text-transparent">
            Securing Our Future
          </span> <br />With Oxi
        </motion.h1>
        
        <motion.p 
          className="text-2xl md:text-3xl max-w-4xl mx-auto mb-16 text-[#CCCCCC]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Our groundbreaking solution revolutionizes corporate decarbonization.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <button className="bg-gradient-to-r from-[#34C464] to-[#47D95D] px-10 py-5 text-2xl font-semibold text-[#004900] rounded-xl hover:shadow-lg hover:shadow-[#34C464]/30 transition-all transform hover:scale-105">
            Get Started
          </button>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#34C464]/30 mx-20 my-20"></div>

      {/* Features Section - Más grande con mejor jerarquía */}
      <section className="container mx-auto px-6 py-28">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-20 text-center">
            Why <span className="text-[#47D95D]">Choose Oxi</span>?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Insights',
                description: 'Advanced analytics for Scope 1, 2 & 3 emissions with our proprietary machine learning models',
                bg: 'bg-[#002800]'
              },
              {
                icon: '📊',
                title: 'Actionable Data',
                description: 'Sector benchmarks and personalized reduction strategies updated in real-time',
                bg: 'bg-[#003000]'
              },
              {
                icon: '🌐',
                title: 'Global Compliance',
                description: 'Full alignment with GHG Protocol, EU Taxonomy and UN Sustainable Development Goals',
                bg: 'bg-[#002800]'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`${feature.bg} p-10 rounded-2xl border-2 border-[#34C464]/30 hover:border-[#47D95D] transition-all h-full`}
                whileHover={{ y: -10, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#34C464]">{feature.title}</h3>
                <p className="text-xl text-[#CCCCCC]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#34C464]/30 mx-20 my-20"></div>

      {/* Testimonials Section - Más destacada */}
      <section className="container mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-lg uppercase tracking-widest text-[#34C464] mb-6">TRUSTED BY INDUSTRY LEADERS</h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-16">What Our Partners Say</h2>
          
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="bg-[#002800] p-12 rounded-3xl border-2 border-[#34C464]/30 relative"
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-0 -mt-6 -ml-6 text-8xl text-[#34C464]/30">“</div>
              <blockquote className="text-2xl md:text-3xl italic mb-10 px-8 leading-relaxed">
                "Oxi doesn't just report problems—it solves them. We've cut 15% of our emissions in just 3 months using their intelligent recommendations, while maintaining operational efficiency."
              </blockquote>
              <div className="text-xl font-bold text-[#47D95D]">— Sustainability Director</div>
              <div className="text-lg text-[#CCCCCC]">Tech500 Company</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#34C464]/30 mx-20 my-20"></div>

      {/* Final CTA Section - Más prominente */}
      <section className="container mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10">
            Ready to <span className="text-[#47D95D]">Transform</span> Your Sustainability Journey?
          </h2>
          <p className="text-2xl text-[#CCCCCC] max-w-4xl mx-auto mb-16">
            Join hundreds of forward-thinking companies already reducing their carbon footprint with Oxi.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#34C464] to-[#47D95D] px-12 py-6 text-2xl font-bold text-[#004900] rounded-xl hover:shadow-lg hover:shadow-[#34C464]/40 transition-all"
            >
              Request Demo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-[#47D95D] px-12 py-6 text-2xl font-bold text-white rounded-xl hover:bg-[#47D95D]/10 transition-all"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;