import React, { useState, useEffect } from "react";
import { WorkflowProvider } from "../context/WorkflowContext";
import WorkflowAnalyzer from "../components/WorkflowAnalyzer";
import ActionResult from "../components/ActionResult";
import { FiSun, FiMoon } from "react-icons/fi";

const Dashboard = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("light");
  };

  return (
    <WorkflowProvider>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
        {isDark ? "Light" : "Dark"}
      </button>

      <div className="dashboard">
        <div className="dashboard-header">
          <h1>FlowAI</h1>
          <p>Automazione intelligente con AI</p>
        </div>

        <div className="dashboard-content">
          <WorkflowAnalyzer />
          <ActionResult />
        </div>
      </div>
    </WorkflowProvider>
  );
};

export default Dashboard;
