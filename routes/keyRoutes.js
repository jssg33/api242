const express = require("express");
const router = express.Router();
const keyController = require("../controllers/keyController");

/**
 * @swagger
 * tags:
 *   - name: PKI Keys
 *     description: PKI server key management for user sessions
 */

/**
 * @swagger
 * /api/keyserver/session-keys:
 *   post:
 *     summary: Issue a new key for a user session
 *     tags: [PKI Keys]
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
 *               keyType:
 *                 type: string
 *                 enum: [rsa, ec, ed25519, aes, 3des, des]
 *               keySize:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Key issued successfully
 */
router.post("/session-keys", keyController.issueSessionKey);

/**
 * @swagger
 * /api/keyserver/session-keys/{sessionId}:
 *   get:
 *     summary: Get all public keys for a user session
 *     tags: [PKI Keys]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of keys for the session
 */
router.get("/session-keys/:sessionId", keyController.getSessionKeys);

/**
 * @swagger
 * /api/keyserver/keys/{id}:
 *   delete:
 *     summary: Delete a key by ID
 *     tags: [PKI Keys]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Key deleted successfully
 */
router.delete("/keys/:id", keyController.deleteKey);

module.exports = router;
