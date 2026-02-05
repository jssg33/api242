const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminLogController');

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminLog:
 *       type: object
 *       required:
 *         - id
 *         - userid
 *         - date
 *       properties:
 *         id:
 *           type: integer
 *         userid:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         description:
 *           type: string
 *         acknowledged:
 *           type: string
 *         techid:
 *           type: integer
 *         managerescid:
 *           type: integer
 *         threatlevel:
 *           type: string
 *       example:
 *         id: 1
 *         userid: "admin123"
 *         date: "2026-02-05T00:23:40.130Z"
 *         description: "Unauthorized login attempt"
 *         acknowledged: "yes"
 *         techid: 42
 *         managerescid: 7
 *         threatlevel: "high"
 */

/**
 * @swagger
 * /api/adminlogs:
 *   get:
 *     summary: Get all admin logs
 *     tags: [AdminLog]
 *     responses:
 *       200:
 *         description: List of admin logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdminLog'
 */
router.get('/', controller.getAllAdminLogs);

/**
 * @swagger
 * /api/adminlogs/{id}:
 *   get:
 *     summary: Get an admin log by ID
 *     tags: [AdminLog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the admin log
 *     responses:
 *       200:
 *         description: Admin log found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminLog'
 *       404:
 *         description: Admin log not found
 */
router.get('/:id', controller.getAdminLogById);

/**
 * @swagger
 * /api/adminlogs:
 *   post:
 *     summary: Create a new admin log
 *     tags: [AdminLog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminLog'
 *     responses:
 *       201:
 *         description: Admin log created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminLog'
 */
router.post('/', controller.createAdminLog);

module.exports = router;
