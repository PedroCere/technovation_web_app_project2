import React, { useEffect } from 'react';
import Home from './assets/componentes/Home';
import Dashboard from './assets/componentes/Dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Carbon from './assets/componentes/Carbon';
import Predictions from './assets/componentes/Predictions';
import Preferences from './assets/componentes/Preferences';
import Account from './assets/componentes/Account';
import Settings from './assets/componentes/Settings';


function App() {
  useEffect(() => {
    document.title = 'OXI';
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/carbon" element={<Carbon />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />


      </Routes>
    </Router>
  );
}


export default App;