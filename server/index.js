const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

console.log("Avviando il server FlowAI");

const app = express();

app.use(cors());
app.use(express.json());

try {
  const workflowRoutes = require("./routing/workflow");
  console.log("✅ Rotte caricate");
  app.use("/api/workflows", workflowRoutes);
} catch (err) {
  console.error("❌ Errore caricamento rotte:", err.message);
}
// endpoint test

app.get("/", (req, res) => {
  res.json({ message: "API FlowAI in corso" });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;
console.log(`Tentativo sulla porta: ${PORT} `);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server aperto in http://0.0.0.0:${PORT} `);
});
