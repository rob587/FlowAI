const express = require("express");
const router = express.Router();
const {
  analyzeWorkflow,
  getWorkflows,
  getStats,
} = require("../controllers/workflowController");

console.log("Caricamento delle rotte di Workflow");

router.post("/analyze", analyzeWorkflow);
router.post("/all", getWorkflows);
router.get("/stats", getStats);

module.exports = router;
