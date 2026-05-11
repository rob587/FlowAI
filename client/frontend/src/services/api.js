import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const analyzeWorkflow = (inputText) => {
  return API.post("/workflows/analyze", { input_text: inputText });
};
