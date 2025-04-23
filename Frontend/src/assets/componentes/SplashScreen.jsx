import React, { useEffect } from "react";
import "./SplashScreen.css";

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
      
        <h1>Loading...</h1>
      </div>
    </div>
  );
};

export default SplashScreen;
