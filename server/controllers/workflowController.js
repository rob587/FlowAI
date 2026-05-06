const db = require("../db");
const { analyze } = require("../services/aiService");

const analyzeWorkFlow = async (req, res) => {
  try {
    const { input_text } = req.body;

    if (!input_text) {
      return res.status(400).json({ error: "Testo richiestp" });
    }
    console.log("Analizzando", input_text);

    const aiResponse = await analyze(input_text);

    console.log("Risposta AI:", aiResponse);

    const query =
      "INSERT INTO workflows (input_text, ai_response, action_type, status) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [input_text, JSON.stringify(aiResponse), aiResponse.action, "completato"],
      (err, result) => {
        if (err) {
          console.error("❌ DB Error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        res.json({
          success: true,
          workflow_id: result.insertId,
          analysis: aiResponse,
        });
      },
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
