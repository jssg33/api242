// routes/releaseRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/releaseController');

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
 *     responses:
 *       200:
 *         description: Release found
 *   put:
 *     summary: Update a release
 *     tags: [Releases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Release'
 *     responses:
 *       200:
 *         description: Release updated
 *   delete:
 *     summary: Delete a release
 *     tags: [Releases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Release deleted
 */
router.get('/:id', controller.getReleaseById);
router.put('/:id', controller.updateRelease);
router.delete('/:id', controller.deleteRelease);

module.exports = router;
