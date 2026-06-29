import React, { useContext } from "react";
import { WorkflowContext } from "../context/WorkflowContext";
import { FiCheckCircle, FiPlay } from "react-icons/fi";

const getActionIcon = (action) => {
  switch (action) {
    case "send_email":
      return <FiMail size={18} />;
    case "create_task":
      return <FiClipboard size={18} />;
    case "schedule_call":
      return <FiPhone size={18} />;
    case "send_reminder":
      return <FiBell size={18} />;
    default:
      return null;
  }
};

const getActionLabel = (action) => {
  switch (action) {
    case "send_email":
      return "Invia Email";
    case "create_task":
      return "Crea Task";
    case "schedule_call":
      return "Schedula Chiamata";
    case "send_reminder":
      return "Invia Reminder";
    default:
      return action;
  }
};

const getUrgencyClass = (urgency) => {
  switch (urgency) {
    case "high":
      return "urgency-high";
    case "medium":
      return "urgency-medium";
    case "low":
      return "urgency-low";
    default:
      return "";
  }
};

const ActionResult = () => {
  const { workflow, actionResult, loading, executeAction } =
    useContext(WorkflowContext);

  if (!workflow) return null;

  const { analysis, workflow_id } = workflow;

  const handleExecute = async () => {
    await executeAction(
      workflow_id,
      analysis.action,
      analysis.client_name,
      analysis.subject,
      analysis.message,
      analysis.urgency,
    );
  };

  return (
    <>
      <div className="result-container fade-in">
        <h3>Analisi AI</h3>

        <div className="analysis-card">
          <p>
            <strong>Azione:</strong>{" "}
            <span className="action-badge">
              {getActionIcon(analysis.action)} {getActionLabel(analysis.action)}
            </span>
          </p>
          <p>
            <strong>Cliente:</strong> {analysis.client_name}
          </p>
          <p>
            <strong>Urgenza:</strong>{" "}
            <span className={getUrgencyClass(analysis.urgency)}>
              {analysis.urgency}
            </span>
          </p>
          <p>
            <strong>Soggetto:</strong> {analysis.subject}
          </p>
          <p>
            <strong>Messaggio:</strong>
          </p>
          <div className="message-box">{analysis.message}</div>
        </div>

        <button
          className="execute-btn"
          onClick={handleExecute}
          disabled={loading}
        >
          {loading ? "⏳ Eseguendo..." : "Esegui Azione"} <FiPlay />
        </button>

        {actionResult && (
          <div className="action-success fade-in">
            <FiCheckCircle size={24} />
            <h4>Azione Eseguita!</h4>
            <pre>{JSON.stringify(actionResult.result, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};

export default ActionResult;
