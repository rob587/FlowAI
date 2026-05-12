import React, { useContext } from "react";
import { WorkflowContext } from "../context/WorkflowContext";

const ActionResult = () => {
  const { workflow, ActionResult, loading, executeAction } =
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

  return <div></div>;
};

export default ActionResult;
