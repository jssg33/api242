const express = require("express");
const router = express.Router();
const instanceController = require("../controllers/instanceController");

/**
 * @openapi
 * components:
 *   schemas:
 *     Instance:
 *       type: object
 *       required:
 *         - branchId
 *         - instanceType
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *         branchId:
 *           type: string
 *           description: The ID of the branch this instance belongs to
 *         instanceType:
 *           type: string
 *           description: Type of instance (e.g., "production", "staging")
 *         status:
 *           type: string
 *           description: Current status of the instance
 *           default: active
 *         createdAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "67a1b2c3d4e5f6a7b8c9d0e1"
 *         branchId: "66f1a2b3c4d5e6f7a8b9c0d1"
 *         instanceType: "production"
 *         status: "active"
 *         createdAt: "2025-01-30T12:34:56.000Z"
 */

/**
 * @openapi
 * /instances:
 *   get:
 *     summary: Get all instances
 *     tags:
 *       - Instances
 *     responses:
 *       200:
 *         description: List of instances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Instance'
 */
router.get("/", instanceController.getAllInstances);

/**
 * @openapi
 * /instances/{id}:
 *   get:
 *     summary: Get a single instance by ID
 *     tags:
 *       - Instances
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Instance ID
 *     responses:
 *       200:
 *         description: Instance found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instance'
 *       404:
 *         description: Instance not found
 */
router.get("/:id", instanceController.getInstanceById);

/**
 * @openapi
 * /instances:
 *   post:
 *     summary: Create a new instance
 *     tags:
 *       - Instances
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Instance'
 *     responses:
 *       201:
 *         description: Instance created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instance'
 *       400:
 *         description: Invalid input
 */
router.post("/", instanceController.createInstance);

/**
 * @openapi
 * /instances/{id}:
 *   put:
 *     summary: Update an instance
 *     tags:
 *       - Instances
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Instance ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Instance'
 *     responses:
 *       200:
 *         description: Instance updated
 *       404:
 *         description: Instance not found
 */
router.put("/:id", instanceController.updateInstance);

/**
 * @openapi
 * /instances/{id}:
 *   delete:
 *     summary: Delete an instance
 *     tags:
 *       - Instances
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Instance ID
 *     responses:
 *       200:
 *         description: Instance deleted
 *       404:
 *         description: Instance not found
 */
router.delete("/:id", instanceController.deleteInstance);

module.exports = router;
