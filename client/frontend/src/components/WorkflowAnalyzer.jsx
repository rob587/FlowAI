import React, { useContext } from "react";
import { WorkflowContext } from "../context/WorkflowContext";

const WorkflowAnalyzer = () => {
  const [inputText, setInputText] = useState("");
  const { loading, error, analyzeInput } = useContext(WorkflowContext);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      alert("Inserisci qualcosa!");
      return;
    }
    await analyzeInput(inputText);
  };
  return <div></div>;
};

export default WorkflowAnalyzer;
