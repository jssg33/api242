const express = require("express");
const router = express.Router();
const controller = require("../controllers/licenseLogController");

router.get("/", controller.getLicenseLogs);
router.post("/", controller.createLicenseLog);
router.get("/:id", controller.getLicenseLogById);
router.put("/:id", controller.updateLicenseLog);
router.delete("/:id", controller.deleteLicenseLog);

module.exports = router;
