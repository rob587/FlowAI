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
  return (
    <>
      <div className="analyzer-container">
        <h2>🤖 Analizzatore AI</h2>
        <textarea
          className="analyzer-input"
          placeholder="Descrivi il problema... es: 'Il cliente Mario non paga da 2 mesi'"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={loading}
        />
        <button
          className="analyzer-btn"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "⏳ Analizzando..." : "Analizza"} <FiSend />
        </button>
        {error && <p className="error-text">❌ Errore: {error}</p>}
      </div>
    </>
  );
};

export default WorkflowAnalyzer;
