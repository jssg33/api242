const express = require("express");
const router = express.Router();
const controller = require("../controllers/truckController");

/**
 * @openapi
 * tags:
 *   name: Trucks
 *   description: Fleet service trucks assigned to Installers and Installer Managers
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Truck:
 *       type: object
 *       required:
 *         - manufacturer
 *         - description
 *         - serialnumber
 *       properties:
 *         id:
 *           type: string
 *         manufacturer:
 *           type: string
 *         description:
 *           type: string
 *         serialnumber:
 *           type: string
 *         assignedto:
 *           type: object
 *           properties:
 *             refModel:
 *               type: string
 *               description: Installer or InstallerManager
 *             refId:
 *               type: string
 *         buid:
 *           type: string
 *           description: Business Unit ID
 *         ouid:
 *           type: string
 *           description: Organization Unit ID
 */

/**
 * @openapi
 * /trucks:
 *   get:
 *     summary: Get all trucks
 *     tags: [Trucks]
 *     responses:
 *       200:
 *         description: List of trucks
 */
router.get("/", controller.getAllTrucks);

/**
 * @openapi
 * /trucks/{id}:
 *   get:
 *     summary: Get a truck by ID
 *     tags: [Trucks]
 */
router.get("/:id", controller.getTruckById);

/**
 * @openapi
 * /trucks:
 *   post:
 *     summary: Create a new truck
 *     tags: [Trucks]
 */
router.post("/", controller.createTruck);

/**
 * @openapi
 * /trucks/{id}:
 *   put:
 *     summary: Update a truck
 *     tags: [Trucks]
 */
router.put("/:id", controller.updateTruck);

/**
 * @openapi
 * /trucks/{id}:
 *   delete:
 *     summary: Delete a truck
 *     tags: [Trucks]
 */
router.delete("/:id", controller.deleteTruck);

module.exports = router;
