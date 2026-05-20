const express = require("express");
const router = express.Router();
const controller = require("../controllers/businessUnitController");

/**
 * @openapi
 * tags:
 *   name: BusinessUnits
 *   description: Business Units inside Organization Units
 */

router.get("/", controller.getAllBusinessUnits);
router.get("/:id", controller.getBusinessUnitById);
router.post("/", controller.createBusinessUnit);
router.put("/:id", controller.updateBusinessUnit);
router.delete("/:id", controller.deleteBusinessUnit);

module.exports = router;
