import { createContext, useState } from "react";

export const WorkflowContext = createContext();

export const WorkflowProvider = ({ children }) => {
  const [workflow, setWorkflow] = useState(null);
  const [actionResult, setActionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Analizza il testo con AI
  const analyzeInput = async (inputText) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:5000/api/workflows/analyze",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input_text: inputText }),
        },
      );
      const data = await response.json();
      setWorkflow(data);
      setActionResult(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Esegui l'azione
  const executeAction = async (
    workflowId,
    action,
    clientName,
    subject,
    message,
    urgency,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:5000/api/actions/execute",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            workflow_id: workflowId,
            action: action,
            client_name: clientName,
            subject: subject,
            message: message,
            urgency: urgency,
          }),
        },
      );
      const data = await response.json();
      setActionResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WorkflowContext.Provider
      value={{
        workflow,
        actionResult,
        loading,
        error,
        analyzeInput,
        executeAction,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};
