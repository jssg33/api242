const express = require("express");
const router = express.Router();
const instanceController = require("../controllers/instanceController");

router.get("/", instanceController.getAllInstances);
router.get("/:id", instanceController.getInstanceById);
router.post("/", instanceController.createInstance);
router.put("/:id", instanceController.updateInstance);
router.delete("/:id", instanceController.deleteInstance);

module.exports = router;
