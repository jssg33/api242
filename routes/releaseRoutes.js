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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Release'
 */
router.get('/', controller.getReleases);

/**
 * @swagger
 * /api/releases:
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
 */
router.get('/:id', controller.getReleaseById);

/**
 * @swagger
 * /api/releases/{id}:
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
 */
router.put('/:id', controller.updateRelease);

/**
 * @swagger
 * /api/releases/{id}:
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
 */
router.delete('/:id', controller.deleteRelease);

module.exports = router;
