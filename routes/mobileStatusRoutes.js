// routes/mobileStatusRoutes.js
const express = require("express");
const router = express.Router();
const { getMobileStatus } = require("../controllers/mobileStatusController");

/**
 * @swagger
 * tags:
 *   name: MobileStatus
 *   description: Mobile app configuration and versioning
 */

/**
 * @swagger
 * /api/mobilestatus:
 *   get:
 *     summary: Get the latest mobile app status
 *     tags: [MobileStatus]
 *     responses:
 *       200:
 *         description: Latest mobile configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sequenceGuid:
 *                   type: string
 *                   example: "c1e4b0b2-6f3d-4a2a-9f3c-8c2d1e8f4a77"
 *                 latestVersion:
 *                   type: string
 *                   example: "2.4.1"
 *                 lastUpdate:
 *                   type: string
 *                   example: "2026-06-21"
 *                 googlePlayUrl:
 *                   type: string
 *                 appleStoreUrl:
 *                   type: string
 *                 snapStoreCommand:
 *                   type: string
 *                   example: "snap install gli.velocity.linux"
 *                 config01:
 *                   type: string
 *                 config02:
 *                   type: string
 *                 config03:
 *                   type: string
 *                 config04:
 *                   type: string
 *                 config05:
 *                   type: string
 *                 config06:
 *                   type: string
 *                 config07:
 *                   type: string
 *                 config08:
 *                   type: string
 *                 config09:
 *                   type: string
 *                 config10:
 *                   type: string
 *       404:
 *         description: No mobile status found
 *       500:
 *         description: Server error
 */
router.get("/", getMobileStatus);

module.exports = router;
