const express = require("express");
const router = express.Router();
const { executeAction } = require("../controllers/actionController");

console.log("Route Action in caricamento..");

router.post("/execute", executeAction);

module.exports = router;
