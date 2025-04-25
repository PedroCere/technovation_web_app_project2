import React from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Account = () => {
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
              Account Settings
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Manage your account information and security
            </p>
          </div>

          <div className="bg-[#1E1E1E] p-6 rounded-xl border border-emerald-400/20 mb-6">
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">👤 Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">First Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#2A2A2A] rounded-lg p-2 text-white border border-emerald-400/20"
                  defaultValue="John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Last Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#2A2A2A] rounded-lg p-2 text-white border border-emerald-400/20"
                  defaultValue="Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-[#2A2A2A] rounded-lg p-2 text-white border border-emerald-400/20"
                  defaultValue="john.doe@example.com"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#1E1E1E] p-6 rounded-xl border border-emerald-400/20 mb-6">
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">🔒 Security</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-gray-400">Last changed 3 months ago</p>
                </div>
                <button className="px-4 py-2 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-300 rounded-lg">
                  Change Password
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-400">Add an extra layer of security</p>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-[#1E1E1E] p-6 rounded-xl border border-rose-400/20">
            <h3 className="text-lg font-semibold text-rose-400 mb-4">⚠️ Danger Zone</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-gray-400">Permanently remove your account</p>
                </div>
                <button className="px-4 py-2 bg-rose-400/10 hover:bg-rose-400/20 text-rose-300 rounded-lg">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Account;