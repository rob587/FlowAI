const db = require("../db");
const { analyze } = require("../services/aiService");

const analyzeWorkflow = async (req, res) => {
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

const getWorkflows = (req, res) => {
  const query = "SELECT * FROM workflows ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

const getStats = (req, res) => {
  const statsQuery = `
    SELECT 
      COUNT(*) as total_workflows,
      SUM(CASE WHEN action_type = 'send_email' THEN 1 ELSE 0 END) as emails,
      SUM(CASE WHEN action_type = 'create_task' THEN 1 ELSE 0 END) as tasks,
      SUM(CASE WHEN action_type = 'schedule_call' THEN 1 ELSE 0 END) as calls,
      SUM(CASE WHEN action_type = 'send_reminder' THEN 1 ELSE 0 END) as reminders
    FROM workflows
  `;

  db.query(statsQuery, (err, results) => {
    if (err) {
      console.error(" DB Errore:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results[0]);
  });
};

module.exports = { analyzeWorkflow, getWorkflows, getStats };
