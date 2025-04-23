import React, { useEffect, useState } from 'react';
import Home from './assets/componentes/Home';
import Dashboard from './assets/componentes/Dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Carbon from './assets/componentes/Carbon';
import Predictions from './assets/componentes/Predictions';
import Preferences from './assets/componentes/Preferences';
import Account from './assets/componentes/Account';
import Settings from './assets/componentes/Settings';
import EntrySelector from './assets/componentes/EntrySelector';
import Loading from './assets/componentes/Loading';
import LoadingTransition from './assets/componentes/LoadingTransition';
import { successSound } from './utils/sounds';

function App() {
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [minLoadingElapsed, setMinLoadingElapsed] = useState(false);

  useEffect(() => {
    document.title = 'OXI';
    const savedSoundEnabled = localStorage.getItem("soundEnabled");
    if (savedSoundEnabled === "true") {
      setSoundEnabled(true);
      setLoading(false);
      setLoaded(true); // Show dashboard immediately if sound enabled
    } else {
      const timer = setTimeout(() => {
        setMinLoadingElapsed(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (soundEnabled && minLoadingElapsed) {
      setLoading(false);
      setTransitioning(true);
    } else if (!soundEnabled) {
      setLoading(true);
    }
  }, [soundEnabled, minLoadingElapsed]);

  const enableSound = () => {
    successSound.play();
    setSoundEnabled(true);
    localStorage.setItem("soundEnabled", "true");
    setLoading(false);
    setTransitioning(true);
  };

  const handleTransitionComplete = () => {
    setTransitioning(false);
    setLoaded(true);
  };

  if (loading) {
    return <Loading enableSound={enableSound} />;
  }

  // Remove the transitioning conditional return block entirely
  // Instead, always render Dashboard inside Routes with transitioning prop

  if (loaded) {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<EntrySelector />} />
            <Route path="/dashboard" element={<Dashboard soundEnabled={soundEnabled} enableSound={enableSound} transitioning={transitioning} />} />
            <Route path="/carbon" element={<Carbon />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/account" element={<Account />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
        {transitioning && <LoadingTransition onComplete={handleTransitionComplete} />}
      </>
    );
  }

  return null;
}

export default App;
