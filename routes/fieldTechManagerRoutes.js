// routes/fieldTechManagerRoutes.js
const express = require('express');
const router = express.Router();
const { objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);
const controller = require('../controllers/fieldTechManagerController');

/**
 * @swagger
 * tags:
 *   name: FieldTechManagers
 *   description: Field Technician Manager management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FieldTechManager:
 *       type: object
 *       required:
 *         - fullname
 *         - username
 *       properties:
 *         id:
 *           type: string
 *         fullname:
 *           type: string
 *         username:
 *           type: string
 *         firstname:
 *           type: string
 *         address1:
 *           type: string
 *         address2:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         zip:
 *           type: string
 *         phone:
 *           type: string
 *         cell:
 *           type: string
 *         region:
 *           type: string
 *         bu:
 *           type: string
 *         specialitytype:
 *           type: string
 *         hiredate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [active, suspended, terminated, leave]
 *         defaultbranch:
 *           type: string
 *         defaultbranchid:
 *           type: string
 *         techlist:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FieldTech'
 */

/**
 * @swagger
 * /api/fieldtechmanagers:
 *   get:
 *     summary: Get all field tech managers
 *     tags: [FieldTechManagers]
 *     responses:
 *       200:
 *         description: List of field tech managers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FieldTechManager'
 *       500:
 *         description: Server error
 */
router.get('/', controller.getAllFieldTechManagers);

/**
 * @swagger
 * /api/fieldtechmanagers/{id}:
 *   get:
 *     summary: Get a field tech manager by ID
 *     tags: [FieldTechManagers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Field tech manager found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FieldTechManager'
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/:id', controller.getFieldTechManagerById);

/**
 * @swagger
 * /api/fieldtechmanagers:
 *   post:
 *     summary: Create a new field tech manager
 *     tags: [FieldTechManagers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FieldTechManager'
 *     responses:
 *       201:
 *         description: Field tech manager created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FieldTechManager'
 *       400:
 *         description: Validation error
 */
router.post('/', controller.createFieldTechManager);

/**
 * @swagger
 * /api/fieldtechmanagers/{id}:
 *   put:
 *     summary: Update a field tech manager
 *     tags: [FieldTechManagers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FieldTechManager'
 *     responses:
 *       200:
 *         description: Field tech manager updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FieldTechManager'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.updateFieldTechManager);

/**
 * @swagger
 * /api/fieldtechmanagers/{id}:
 *   delete:
 *     summary: Delete a field tech manager
 *     tags: [FieldTechManagers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Field tech manager deleted
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', controller.deleteFieldTechManager);

module.exports = router;
