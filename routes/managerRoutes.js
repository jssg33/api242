const express = require("express");
const {
  getManagers,
  getManagerById,
  createManager,
  updateManager,
  deleteManager
} = require("../controllers/managerController.js");

const router = express.Router();
const { objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);

/**
 * @swagger
 * tags:
 *   name: Managers
 *   description: Manager hierarchy and assignment API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Manager:
 *       type: object
 *       properties:
 *         manager:
 *           type: string
 *         company:
 *           type: string
 *         users:
 *           type: array
 *           items:
 *             type: string
 *         supervisorid:
 *           type: string
 *         isceo:
 *           type: number
 *           enum: [0, 1]
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
 *       example:
 *         manager: "65f1c2a9b1234a0012cd5678"
 *         company: "65f1c2a9b1234a0012cd9999"
 *         users: ["65f1c2a9b1234a0012cd7777", "65f1c2a9b1234a0012cd8888"]
 *         supervisorid: "65f1c2a9b1234a0012cd1111"
 *         isceo: 0
 */

/**
 * @swagger
 * /managers:
 *   get:
 *     summary: Get all managers
 *     tags: [Managers]
 *     responses:
 *       200:
 *         description: List of managers
 */
router.get("/", getManagers);

/**
 * @swagger
 * /managers/{id}:
 *   get:
 *     summary: Get manager by ID
 *     tags: [Managers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Manager data
 *       404:
 *         description: Manager not found
 */
router.get("/:id", getManagerById);

/**
 * @swagger
 * /managers:
 *   post:
 *     summary: Create a new manager
 *     tags: [Managers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Manager'
 *     responses:
 *       201:
 *         description: Manager created
 */
router.post("/", createManager);

/**
 * @swagger
 * /managers/{id}:
 *   put:
 *     summary: Update a manager
 *     tags: [Managers]
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
 *             $ref: '#/components/schemas/Manager'
 *     responses:
 *       200:
 *         description: Manager updated
 *       404:
 *         description: Manager not found
 */
router.put("/:id", updateManager);

/**
 * @swagger
 * /managers/{id}:
 *   delete:
 *     summary: Delete a manager
 *     tags: [Managers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Manager deleted
 *       404:
 *         description: Manager not found
 */
router.delete("/:id", deleteManager);

module.exports = router;
