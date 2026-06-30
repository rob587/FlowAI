import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const analyzeWorkflow = (inputText) => {
  return API.post("/workflows/analyze", { input_text: inputText });
};

export const executeAction = (workflowId, action, data) => {
  return API.post("/actions/execute", {
    workflow_id: workflowId,
    action: action,
    ...data,
  });
};

export const getStats = () => {
  return API.get("/workflows/stats");
};

export default API;
