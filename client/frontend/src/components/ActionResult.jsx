import React, { useContext } from "react";
import { WorkflowContext } from "../context/WorkflowContext";
import { FiCheckCircle, FiPlay } from "react-icons/fi";

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
      <div className="result-container">
        <h3> Analisi AI</h3>

        <div className="analysis-card">
          <p>
            <strong>Azione:</strong> {analysis.action}
          </p>
          <p>
            <strong>Cliente:</strong> {analysis.client_name}
          </p>
          <p>
            <strong>Urgenza:</strong>{" "}
            <span className={`urgency-${analysis.urgency}`}>
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
          <div className="action-success">
            <FiCheckCircle size={24} />
            <h4> Azione Eseguita!</h4>
            <p>ID: {actionResult.action_id}</p>
            <pre>{JSON.stringify(actionResult.result, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};

export default ActionResult;
