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
 *         id:
 *           type: string
 *         sessionId:
 *           type: string
 *         keyId:
 *           type: string
 *         alias:
 *           type: string
 *         keyType:
 *           type: string
 *         publicKey:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - sessionId
 *         - keyId
 *         - keyType
 *         - publicKey
 */

/**
 * @swagger
 * tags:
 *   - name: PKI Keys
 *     description: PKI server key management for user sessions
 */

/**
 * @swagger
 * /pki/session-keys:
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
 *                 description: MongoDB ObjectId of the UserSession
 *               alias:
 *                 type: string
 *                 description: Human-friendly name for the key
 *               keyType:
 *                 type: string
 *                 enum: [rsa, ec, ed25519, aes, 3des, des]
 *                 description: >
 *                   Type of key to generate:
 *                   - rsa: RSA public/private key pair
 *                   - ec: Elliptic Curve key pair
 *                   - ed25519: Ed25519 key pair
 *                   - aes: AES symmetric key
 *                   - 3des: Triple DES symmetric key
 *                   - des: DES symmetric key
 *               keySize:
 *                 type: integer
 *                 description: >
 *                   Key size depends on keyType:
 *                   - RSA: 2048 or 4096
 *                   - AES: 128, 192, or 256
 *                   - EC/Ed25519/DES/3DES: ignored
 *             required:
 *               - sessionId
 *               - keyType
 *     responses:
 *       201:
 *         description: Key issued successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/KeyAssignment'
 *       400:
 *         description: Invalid session or unsupported key type
 *       500:
 *         description: Internal server error
 */
router.post("/pki/session-keys", keyController.issueSessionKey);

/**
 * @swagger
 * /pki/session-keys/{sessionId}:
 *   get:
 *     summary: Get all public keys for a user session
 *     tags: [PKI Keys]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the UserSession
 *     responses:
 *       200:
 *         description: List of keys for the session
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/KeyAssignment'
 *       404:
 *         description: Session not found
 */
router.get("/pki/session-keys/:sessionId", keyController.getSessionKeys);

/**
 * @swagger
 * /pki/keys/{id}:
 *   delete:
 *     summary: Delete a key by ID
 *     tags: [PKI Keys]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the KeyAssignment
 *     responses:
 *       204:
 *         description: Key deleted successfully
 *       404:
 *         description: Key not found
 *       500:
 *         description: Internal server error
 */
router.delete("/pki/keys/:id", keyController.deleteKey);

module.exports = router;
