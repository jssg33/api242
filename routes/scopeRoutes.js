const express = require("express");
const router = express.Router();
const controller = require("../controllers/scopeController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Scope:
 *       type: object
 *       properties:
 *         name: { type: string }
 *         description: { type: string }
 *         url: { type: string }
 *         projectId: { type: string }
 *         customerId: { type: string }
 */

/**
 * @swagger
 * /scopes:
 *   get:
 *     summary: Get all scopes of work
 *     tags: [Scopes]
 *     responses:
 *       200:
 *         description: List of scopes
 */
router.get("/", controller.getScopes);

/**
 * @swagger
 * /scopes:
 *   post:
 *     summary: Create a new scope of work
 *     tags: [Scopes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Scope'
 *     responses:
 *       201:
 *         description: Scope created
 */
router.post("/", controller.createScope);

module.exports = router;
