const express = require("express");
const router = express.Router();
const controller = require("../controllers/downloadLogController");

router.get("/", controller.getDownloadLogs);
router.post("/", controller.createDownloadLog);
router.get("/:id", controller.getDownloadLogById);
router.put("/:id", controller.updateDownloadLog);
router.delete("/:id", controller.deleteDownloadLog);

module.exports = router;
