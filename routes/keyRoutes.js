// routes/keyRoutes.js

const express = require("express");
const router = express.Router();
const keyController = require("../controllers/keyController");

/**
 * @swagger
 * components:
 *   schemas:
 *     KeyAssignment:
 *       type: object
 *       properties:
 *         sessionId:
 *           type: string
 *         keyId:
 *           type: string
 *         alias:
 *           type: string
 *         publicKey:
 *           type: string
 *         deliveredToUser:
 *           type: boolean
 *       required:
 *         - sessionId
 *         - keyId
 *         - publicKey
 */

/**
 * @swagger
 * tags:
 *   - name: Session Keys
 *     description: PKI key issuance for authenticated user sessions
 */

/**
 * @swagger
 * /session-keys:
 *   post:
 *     summary: Issue a PKI key for a user session
 *     tags: [Session Keys]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *               alias:
 *                 type: string
 *             required:
 *               - sessionId
 *     responses:
 *       201:
 *         description: Key issued and assigned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/KeyAssignment'
 */
router.post("/session-keys", keyController.issueSessionKey);

/**
 * @swagger
 * /session-keys/{sessionId}:
 *   get:
 *     summary: Get all keys assigned to a user session
 *     tags: [Session Keys]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of keys for the session
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/KeyAssignment'
 */
router.get("/session-keys/:sessionId", keyController.getSessionKeys);

module.exports = router;
