import { createContext, useState } from "react";

export const WorkflowContext = createContext();

export const WorkflowProvider = ({ children }) => {
  const [workflow, setWorkflow] = useState(null);
  const [actionResult, setActionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeInput = async (inputText) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:5000/api/workflows/analyze",
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
};
