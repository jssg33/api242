// routes/installerManagerRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/installerManagerController");

/**
 * @swagger
 * tags:
 *   name: InstallerManagers
 *   description: API for managing installer managers
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     InstallerManager:
 *       type: object
 *       required:
 *         - fullname
 *         - username
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
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
 *           description: BusinessUnit ObjectId
 *         ouid:
 *           type: string
 *           description: OrganizationUnit ObjectId
 *         installerlist:
 *           type: array
 *           items:
 *             type: string
 *             description: Installer ObjectId
 *       example:
 *         fullname: John Doe
 *         username: jdoe
 *         firstname: John
 *         phone: "555-1234"
 *         cell: "555-5678"
 *         region: Southeast
 *         hiredate: 2024-01-15
 *         status: active
 *         assignedtruck: 65a1b2c3d4e5f6a7b8c9d0e1
 *         buid: 65a1b2c3d4e5f6a7b8c9d0e2
 *         ouid: 65a1b2c3d4e5f6a7b8c9d0e3
 *         installerlist:
 *           - 65a1b2c3d4e5f6a7b8c9d0e4
 */

/**
 * @swagger
 * /installermanagers:
 *   get:
 *     summary: Get all installer managers
 *     tags: [InstallerManagers]
 *     responses:
 *       200:
 *         description: List of installer managers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InstallerManager'
 */
router.get("/", controller.getAllInstallerManagers);

/**
 * @swagger
 * /installermanagers/{id}:
 *   get:
 *     summary: Get installer manager by ID
 *     tags: [InstallerManagers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: InstallerManager ID
 *     responses:
 *       200:
 *         description: Installer manager found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InstallerManager'
 *       404:
 *         description: Not found
 */
router.get("/:id", controller.getInstallerManagerById);

/**
 * @swagger
 * /installermanagers:
 *   post:
 *     summary: Create a new installer manager
 *     tags: [InstallerManagers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InstallerManager'
 *     responses:
 *       201:
 *         description: Installer manager created
 *       400:
 *         description: Validation error
 */
router.post("/", controller.createInstallerManager);

/**
 * @swagger
 * /installermanagers/{id}:
 *   put:
 *     summary: Update an installer manager
 *     tags: [InstallerManagers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InstallerManager'
 *     responses:
 *       200:
 *         description: Installer manager updated
 *       404:
 *         description: Not found
 */
router.put("/:id", controller.updateInstallerManager);

/**
 * @swagger
 * /installermanagers/{id}:
 *   delete:
 *     summary: Delete an installer manager
 *     tags: [InstallerManagers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Installer manager deleted
 *       404:
 *         description: Not found
 */
router.delete("/:id", controller.deleteInstallerManager);

module.exports = router;
