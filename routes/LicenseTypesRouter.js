const router = require('express').Router();
const LicenseType = require('../models/LicenseType');

/**
 * @swagger
 * tags:
 *   name: LicenseTypes
 *   description: Manage license types
 */

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
 *           description: Name of the license type
 *         Description:
 *           type: string
 *           description: Description of the license type
 *       example:
 *         LicenseTypeID: 1
 *         LicenseTypeName: "Enterprise"
 *         Description: "Full enterprise-level licensing"
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
 *         description: License type created
 */

// CREATE
router.post('/', async (req, res) => {
  try {
    const licenseType = new LicenseType(req.body);
    const saved = await licenseType.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const types = await LicenseType.find();
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/licensetypes/{id}:
 *   get:
 *     summary: Get a license type by ID
 *     tags: [LicenseTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: License type found
 *   put:
 *     summary: Update a license type
 *     tags: [LicenseTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LicenseType'
 *     responses:
 *       200:
 *         description: License type updated
 *   delete:
 *     summary: Delete a license type
 *     tags: [LicenseTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: License type deleted
 */

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const type = await LicenseType.findOne({ LicenseTypeID: req.params.id });
    if (!type) return res.status(404).json({ error: 'License type not found' });
    res.json(type);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await LicenseType.findOneAndUpdate(
      { LicenseTypeID: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'License type not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await LicenseType.findOneAndDelete({
      LicenseTypeID: req.params.id
    });
    if (!deleted) return res.status(404).json({ error: 'License type not found' });
    res.json({ message: 'License type deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
