import React from "react";
import React, { useEffect, useState } from "react";
import { getStats } from "../services/api";
import {
  FiMail,
  FiClipboard,
  FiPhone,
  FiBell,
  FiActivity,
} from "react-icons/fi";

const StatsPanel = () => {
  const [stats, getStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await getStats();
      setStats(response.data);
    } catch (err) {
      console.error("Errore caricamento stats:", err);
    }
  };

  return <div></div>;
};

export default StatsPanel;
