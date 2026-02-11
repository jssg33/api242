// routes/LicenseTypesRouter.js
const express = require('express');
const router = express.Router();
const LicenseTypesController = require('../controllers/LicenseTypesController');

/**
 * @swagger
 * components:
 *   schemas:
 *     LicenseType:
 *       type: object
 *       required:
 *         - LicenseTypeName
 *         - Description
 *       properties:
 *         LicenseTypeID:
 *           type: integer
 *           description: Auto-incremented ID
 *         LicenseTypeName:
 *           type: string
 *         Description:
 *           type: string
 *       example:
 *         LicenseTypeID: 1
 *         LicenseTypeName: "Named Users"
 *         Description: "Licenses assigned to individual users."
 */

/**
 * @swagger
 * tags:
 *   - name: LicenseTypes
 *     description: License type management
 */

/**
 * @swagger
 * /api/licensetypes:
 *   get:
 *     summary: Get all license types
 *     tags: [LicenseTypes]
 *     responses:
 *       200:
 *         description: List of license types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LicenseType'
 */
router.get('/', LicenseTypesController.getAll);

/**
 * @swagger
 * /api/licensetypes/{id}:
 *   get:
 *     summary: Get a license type by ID
 *     tags: [LicenseTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: License type found
 *       404:
 *         description: Not found
 */
router.get('/:id', LicenseTypesController.getById);

/**
 * @swagger
 * /api/licensetypes:
 *   post:
 *     summary: Create a new license type
 *     tags: [LicenseTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LicenseType'
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post('/', LicenseTypesController.create);

/**
 * @swagger
 * /api/licensetypes/{id}:
 *   put:
 *     summary: Update a license type
 *     tags: [LicenseTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LicenseType'
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put('/:id', LicenseTypesController.update);

/**
 * @swagger
 * /api/licensetypes/{id}:
 *   delete:
 *     summary: Delete a license type
 *     tags: [LicenseTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete('/:id', LicenseTypesController.delete);

module.exports = router;
