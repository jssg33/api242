const express = require("express");

const router = express.Router();

const controller =
    require("../controllers/projectStorageController");

router.post(
    "/api/projects/ensure-directories",
    controller.ensureDirectories
);

module.exports = router;
