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
  const [stats, setStats] = useState(null);

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

  if (!stats) return null;

  const cards = [
    {
      label: "Totale Workflow",
      value: stats.total_workflows,
      icon: <FiActivity />,
      color: "#6366f1",
    },
    {
      label: "Email Inviate",
      value: stats.emails,
      icon: <FiMail />,
      color: "#3b82f6",
    },
    {
      label: "Task Creati",
      value: stats.tasks,
      icon: <FiClipboard />,
      color: "#f59e0b",
    },
    {
      label: "Chiamate",
      value: stats.calls,
      icon: <FiPhone />,
      color: "#10b981",
    },
    {
      label: "Reminder",
      value: stats.reminders,
      icon: <FiBell />,
      color: "#ec4899",
    },
  ];

  return (
    <>
      <div className="stats-panel fade-in">
        {cards.map((card) => (
          <div
            key={card.label}
            className="stat-card"
            style={{ borderColor: card.color }}
          >
            <div className="stat-icon" style={{ color: card.color }}>
              {card.icon}
            </div>
            <div className="stat-value">{card.value || 0}</div>
            <div className="stat-label">{card.label}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StatsPanel;
