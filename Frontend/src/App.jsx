import React, { useEffect } from 'react';
import Home from './assets/componentes/Home';
import Dashboard from './assets/componentes/Dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {
    document.title = 'OXI';
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}


export default App;