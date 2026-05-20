const express = require("express");
const router = express.Router();
const controller = require("../controllers/installerController");

/**
 * @openapi
 * tags:
 *   name: Installers
 *   description: Installers assigned to fleet trucks and Installer Managers
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Installer:
 *       type: object
 *       required:
 *         - fullname
 *         - username
 *       properties:
 *         id:
 *           type: string
 *         fullname:
 *           type: string
 *         username:
 *           type: string
 *         firstname:
 *           type: string
 *         phone:
 *           type: string
 *         cell:
 *           type: string
 *         region:
 *           type: string
 *         hiredate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [active, suspended, terminated, leave]
 *         assignedtruck:
 *           type: string
 *           description: Truck ObjectId
 *         buid:
 *           type: string
 *         ouid:
 *           type: string
 *         managerid:
 *           type: string
 *           description: Installer Manager ID
 */

/**
 * @openapi
 * /installers:
 *   get:
 *     summary: Get all installers
 *     tags: [Installers]
 */
router.get("/", controller.getAllInstallers);

/**
 * @openapi
 * /installers/{id}:
 *   get:
 *     summary: Get an installer by ID
 *     tags: [Installers]
 */
router.get("/:id", controller.getInstallerById);

/**
 * @openapi
 * /installers:
 *   post:
 *     summary: Create a new installer
 *     tags: [Installers]
 */
router.post("/", controller.createInstaller);

/**
 * @openapi
 * /installers/{id}:
 *   put:
 *     summary: Update an installer
 *     tags: [Installers]
 */
router.put("/:id", controller.updateInstaller);

/**
 * @openapi
 * /installers/{id}:
 *   delete:
 *     summary: Delete an installer
 *     tags: [Installers]
 */
router.delete("/:id", controller.deleteInstaller);

module.exports = router;
