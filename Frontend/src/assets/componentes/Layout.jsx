import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [sidebarHovered, setSidebarHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F0A] via-[#121212] to-[#1A1A1A] text-white flex font-sans">
      <Sidebar isHovered={sidebarHovered} setIsHovered={setSidebarHovered} />
      <div className="flex-1 flex flex-col">
        <Navbar sidebarHovered={sidebarHovered} />
        <main
          className="flex-1 p-6 md:p-8 overflow-y-auto relative"
          style={{ paddingTop: "4rem" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
