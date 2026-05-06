const express = require("express");
const router = express.Router();
const {
  analyzeWorkFlow,
  getWorkflows,
} = require("../controllers/workflowController");

console.log("Caricamento delle rotte di Workflow");

router.post("/analyze", analyzeWorkFlow);
router.post("/all", getWorkflows);

module.exports = router;
