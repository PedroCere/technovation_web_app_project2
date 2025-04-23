import React from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Preferences = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F0A] via-[#121212] to-[#1A1A1A] text-white flex font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar />

        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 p-6 md:p-8 overflow-y-auto"
        >
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Preferences
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Customize your application experience
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Theme Customization */}
            <div className="bg-[#1E1E1E] p-6 rounded-xl border border-emerald-400/20">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">🎨 Theme</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Dark Mode</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Accent Color</label>
                  <select className="w-full bg-[#2A2A2A] rounded-lg p-2 text-white border border-emerald-400/20">
                    <option>Emerald Green</option>
                    <option>Ocean Blue</option>
                    <option>Sunset Orange</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Language & Region */}
            <div className="bg-[#1E1E1E] p-6 rounded-xl border border-emerald-400/20">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">🌐 Language & Region</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Application Language</label>
                  <select className="w-full bg-[#2A2A2A] rounded-lg p-2 text-white border border-emerald-400/20">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Date Format</label>
                  <select className="w-full bg-[#2A2A2A] rounded-lg p-2 text-white border border-emerald-400/20">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-[#1E1E1E] p-6 rounded-xl border border-emerald-400/20">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">🔔 Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Push Notifications</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Data Preferences */}
            <div className="bg-[#1E1E1E] p-6 rounded-xl border border-emerald-400/20">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">📊 Data Collection</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Usage Analytics</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Error Reporting</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button className="px-6 py-2 bg-emerald-400 hover:bg-emerald-500 text-white rounded-lg transition-all">
              Save Changes
            </button>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Preferences;