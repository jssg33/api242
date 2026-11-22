const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);
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
 *         InsertDate:
 *           type: string
 *           format: date-time
 *           description: Set once when the record is created
 *         LastUpdateDate:
 *           type: string
 *           format: date-time
 *           description: Refreshed on every update
 *         SoftDeleteDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Null until the record is soft-deleted
 */

/**
 * @openapi
 * /api/installers:
 *   get:
 *     summary: Get all installers
 *     tags: [Installers]
 */
router.get("/", controller.getAllInstallers);

/**
 * @openapi
 * /api/installers/{id}:
 *   get:
 *     summary: Get an installer by ID
 *     tags: [Installers]
 */
router.get("/:id", controller.getInstallerById);

/**
 * @openapi
 * /api/installers:
 *   post:
 *     summary: Create a new installer
 *     tags: [Installers]
 */
router.post("/", controller.createInstaller);

/**
 * @openapi
 * /api/installers/{id}:
 *   put:
 *     summary: Update an installer
 *     tags: [Installers]
 */
router.put("/:id", controller.updateInstaller);

/**
 * @openapi
 * /api/installers/{id}:
 *   delete:
 *     summary: Delete an installer
 *     tags: [Installers]
 */
router.delete("/:id", controller.deleteInstaller);

module.exports = router;
