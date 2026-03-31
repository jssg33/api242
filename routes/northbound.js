const express = require("express");
const router = express.Router();
const controller = require("../controllers/northboundController");

router.get("/northbound", controller.getNorthbound);

module.exports = router;
