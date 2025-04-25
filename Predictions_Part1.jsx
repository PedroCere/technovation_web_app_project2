import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Filler
} from "chart.js";
import { getPredictionsByUser, deletePrediction } from "../../utils/api";
import PredictionForm from "./PredictionForm";
import PredictionsLoading from "./PredictionsLoading";

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Filler
);

const Predictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoadingTransition, setShowLoadingTransition] = useState(true);
  const userId = "123e4567-e89b-12d3-a456-426614174345";

  const fetchPredictions = () => {
    setLoading(true);
    getPredictionsByUser(userId)
      .then(setPredictions)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  const handleLoadingComplete = () => {
    setShowLoadingTransition(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };
