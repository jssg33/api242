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
 */
router.get('/', (req, res, next) => {
    LicenseTypesController.getAll(req, res, next);
});

/**
 * @swagger
 * /api/licensetypes/{id}:
 *   get:
 *     summary: Get a license type by ID
 *     tags: [LicenseTypes]
 */
router.get('/:id', (req, res, next) => {
    LicenseTypesController.getById(req, res, next);
});

/**
 * @swagger
 * /api/licensetypes:
 *   post:
 *     summary: Create a new license type
 *     tags: [LicenseTypes]
 */
router.post('/', (req, res, next) => {
    LicenseTypesController.create(req, res, next);
});

/**
 * @swagger
 * /api/licensetypes/{id}:
 *   put:
 *     summary: Update a license type
 *     tags: [LicenseTypes]
 */
router.put('/:id', (req, res, next) => {
    LicenseTypesController.update(req, res, next);
});

/**
 * @swagger
 * /api/licensetypes/{id}:
 *   delete:
 *     summary: Delete a license type
 *     tags: [LicenseTypes]
 */
router.delete('/:id', (req, res, next) => {
    LicenseTypesController.delete(req, res, next);
});

module.exports = router;
