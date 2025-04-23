import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Dashboard from "./assets/componentes/Dashboard";
import Carbon from "./assets/componentes/Carbon";
import Predictions from "./assets/componentes/Predictions";
import Preferences from "./assets/componentes/Preferences";
import Account from "./assets/componentes/Account";
import Settings from "./assets/componentes/Settings";
import Home from "./assets/componentes/Home";
import EntrySelector from "./assets/componentes/EntrySelector";
import SplashScreen from "./assets/componentes/SplashScreen";

const AppRoutes = () => {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false);
  const [firstVisitDone, setFirstVisitDone] = useState(() => {
    return localStorage.getItem("firstVisit") === "true";
  });

  useEffect(() => {
    const isMainSection = ["/dashboard", "/predictions", "/carbon", "/account"].includes(location.pathname);

    if (isMainSection && !firstVisitDone) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        setFirstVisitDone(true);
        localStorage.setItem("firstVisit", "true");
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, [location.pathname, firstVisitDone]);

  return (
    <>
      <Routes>
        <Route path="/" element={<EntrySelector />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/carbon" element={<Carbon />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      {showSplash && <SplashScreen onComplete={() => {}} />}
    </>
  );
};

export default AppRoutes;
