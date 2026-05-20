const express = require("express");
const router = express.Router();
const controller = require("../controllers/organizationUnitController");

/**
 * @openapi
 * tags:
 *   name: OrganizationUnits
 *   description: Company Organization Units
 */

router.get("/", controller.getAllOrganizationUnits);
router.get("/:id", controller.getOrganizationUnitById);
router.post("/", controller.createOrganizationUnit);
router.put("/:id", controller.updateOrganizationUnit);
router.delete("/:id", controller.deleteOrganizationUnit);

module.exports = router;
