// routes/fieldTechRoutes.js
const express = require('express');
const router = express.Router();
const { objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);
const controller = require('../controllers/fieldTechController');

/**
 * @swagger
 * tags:
 *   name: FieldTechs
 *   description: Field Technician management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FieldTech:
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
 *         btn:
 *           type: string
 *         managerid:
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
 *         InsertDate:
 *           type: string
 *           format: date-time
 *           description: Set once when the record is created
 *         LastUpdateDate:
 *           type: string
 *           format: date-time
 *           description: Refreshed on every update
 *         SoftDeleteDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Null until the record is soft-deleted
 */

/**
 * @swagger
 * /api/fieldtechs:
 *   get:
 *     summary: Get all field techs
 *     tags: [FieldTechs]
 *     responses:
 *       200:
 *         description: List of field techs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FieldTech'
 *       500:
 *         description: Server error
 */
router.get('/', controller.getAllFieldTechs);

/**
 * @swagger
 * /api/fieldtechs/{id}:
 *   get:
 *     summary: Get a field tech by ID
 *     tags: [FieldTechs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Field tech found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FieldTech'
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/:id', controller.getFieldTechById);

/**
 * @swagger
 * /api/fieldtechs:
 *   post:
 *     summary: Create a new field tech
 *     tags: [FieldTechs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FieldTech'
 *     responses:
 *       201:
 *         description: Field tech created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FieldTech'
 *       400:
 *         description: Validation error
 */
router.post('/', controller.createFieldTech);

/**
 * @swagger
 * /api/fieldtechs/{id}:
 *   put:
 *     summary: Update a field tech
 *     tags: [FieldTechs]
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
 *             $ref: '#/components/schemas/FieldTech'
 *     responses:
 *       200:
 *         description: Field tech updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FieldTech'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.updateFieldTech);

/**
 * @swagger
 * /api/fieldtechs/{id}:
 *   delete:
 *     summary: Delete a field tech
 *     tags: [FieldTechs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Field tech deleted
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', controller.deleteFieldTech);

module.exports = router;
