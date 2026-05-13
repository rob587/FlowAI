import React from "react";
import { WorkflowProvider } from "../context/WorkflowContext";
import WorkflowAnalyzer from "../components/WorkflowAnalyzer";
import ActionResult from "../components/ActionResult";

const Dashboard = () => {
  return (
    <>
      <WorkflowProvider>
        <div className="dashboard">
          <div className="dashboard-header">
            <h1>🚀 FlowAI</h1>
            <p>Automazione intelligente con AI</p>
          </div>

          <div className="dashboard-content">
            <WorkflowAnalyzer />
            <ActionResult />
          </div>
        </div>
      </WorkflowProvider>
    </>
  );
};

export default Dashboard;
