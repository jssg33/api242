const express = require('express');
const router = express.Router();
const controller = require('../controllers/userLogController');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLog:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - hashid
 *         - hashedpassword
 *         - loginstatus
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: "jdoe"
 *         hashid:
 *           type: integer
 *           example: 12345
 *         hashedpassword:
 *           type: string
 *           example: "$2b$10$abcdefg1234567890"
 *         loginstatus:
 *           type: string
 *           example: "SUCCESS"
 *         description:
 *           type: string
 *           example: "User logged in from web portal"
 *         uiorigin:
 *           type: string
 *           example: "web"
 */

/**
 * @swagger
 * tags:
 *   name: UserLogs
 *   description: API for managing user login logs
 */

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Get all user logs
 *     tags: [UserLogs]
 *     responses:
 *       200:
 *         description: List of logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserLog'
 */
router.get('/', controller.getAllLogs);

/**
 * @swagger
 * /api/logs/{id}:
 *   get:
 *     summary: Get a log by ID
 *     tags: [UserLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single log entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLog'
 *       404:
 *         description: Log not found
 */
router.get('/:id', controller.getLogById);

/**
 * @swagger
 * /api/logs:
 *   post:
 *     summary: Create a new log entry
 *     tags: [UserLogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLog'
 *     responses:
 *       201:
 *         description: Log created
 */
router.post('/', controller.createLog);

/**
 * @swagger
 * /api/logs/{id}:
 *   put:
 *     summary: Update a log entry
 *     tags: [UserLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLog'
 *     responses:
 *       200:
 *         description: Log updated
 *       404:
 *         description: Log not found
 */
router.put('/:id', controller.updateLog);

/**
 * @swagger
 * /api/logs/{id}:
 *   delete:
 *     summary: Delete a log entry
 *     tags: [UserLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Log deleted
 *       404:
 *         description: Log not found
 */
router.delete('/:id', controller.deleteLog);

module.exports = router;

