import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ChatBot from "./ChatBot";

const Settings = () => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

          <div className="mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Application Settings
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Configure system-wide settings and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#1E1E1E] p-6 rounded-xl border border-emerald-400/20">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">Profile Image</h3>
              <div className="flex flex-col items-center">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-emerald-400"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mb-4 text-gray-400">
                    No Image
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-sm text-gray-300"
                />
              </div>
            </div>

            {/* Existing settings sections */}
            <div className="bg-[#1E1E1E] p-6 rounded-xl border border-emerald-400/20">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">⚙️ General</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Auto-Save Interval</span>
                  <select className="bg-[#2A2A2A] rounded-lg p-2 text-white border border-emerald-400/20">
                    <option>5 minutes</option>
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Default Temperature Unit</span>
                  <select className="bg-[#2A2A2A] rounded-lg p-2 text-white border border-emerald-400/20">
                    <option>°C</option>
                    <option>°F</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-xl border border-emerald-400/20">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">🛡️ Privacy</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Show Activity Status</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Data Sharing Consent</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-xl border border-emerald-400/20">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">🧠 Advanced</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Developer Mode</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Logging Level</span>
                  <select className="bg-[#2A2A2A] rounded-lg p-2 text-white border border-emerald-400/20">
                    <option>Basic</option>
                    <option>Verbose</option>
                    <option>Debug</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-xl border border-emerald-400/20">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">🔗 Integrations</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Google Workspace</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Microsoft 365</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all">
              Reset Defaults
            </button>
            <button className="px-6 py-2 bg-emerald-400 hover:bg-emerald-500 text-white rounded-lg transition-all">
              Save All Changes
            </button>
        
          </div>
        </motion.main>
    
        </div>
      <ChatBot />
    </div>
    
  );
};

export default Settings;
