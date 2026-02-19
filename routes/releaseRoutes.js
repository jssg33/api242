const express = require('express');
const router = express.Router();
const controller = require('../controllers/releaseController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Release:
 *       type: object
 *       required:
 *         - vendor
 *         - majorCodeBase
 *         - majorCodeDescription
 *         - minorCodeVariant
 *         - minorCodeDescription
 *         - releaseDate
 *         - updates
 *       properties:
 *         vendor:
 *           type: string
 *           example: "Cisco"
 *         majorCodeBase:
 *           type: string
 *           example: "10"
 *         majorCodeDescription:
 *           type: string
 *           example: "Major platform update"
 *         minorCodeVariant:
 *           type: string
 *           example: "10.2"
 *         minorCodeDescription:
 *           type: string
 *           example: "Security patch"
 *         releaseDate:
 *           type: string
 *           format: date
 *           example: "2024-01-15"
 *         updates:
 *           type: object
 *           example:
 *             fixes:
 *               - "Patched CVE-2024-1234"
 *             features:
 *               - "Added new API endpoint"
 */

/**
 * @swagger
 * tags:
 *   name: Releases
 *   description: Software release management
 */

/**
 * @swagger
 * /api/releases:
 *   get:
 *     summary: Get all releases
 *     tags: [Releases]
 *     responses:
 *       200:
 *         description: List of releases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Release'
 *
 *   post:
 *     summary: Create a new release
 *     tags: [Releases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Release'
 *     responses:
 *       201:
 *         description: Release created
 */
router.get('/', controller.getReleases);
router.post('/', controller.createRelease);

/**
 * @swagger
 * /api/releases/{id}:
 *   get:
 *     summary: Get a release by ID
 *     tags: [Releases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Release found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Release'
 *       404:
 *         description: Release not found
 *
 *   put:
 *     summary: Update a release
 *     tags: [Releases]
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
 *             $ref: '#/components/schemas/Release'
 *     responses:
 *       200:
 *         description: Release updated
 *       404:
 *         description: Release not found
 *
 *   delete:
 *     summary: Delete a release
 *     tags: [Releases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Release deleted
 *       404:
 *         description: Release not found
 */
router.get('/:id', controller.getReleaseById);
router.put('/:id', controller.updateRelease);
router.delete('/:id', controller.deleteRelease);

module.exports = router;
