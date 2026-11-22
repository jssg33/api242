// routes/careAnalystRoutes.js
const express = require('express');
const router = express.Router();
const { objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);
const controller = require('../controllers/careAnalystController');

/**
 * @swagger
 * tags:
 *   name: CareAnalysts
 *   description: Customer Care Analyst management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CareAnalyst:
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
 * /api/careanalysts:
 *   get:
 *     summary: Get all care analysts
 *     tags: [CareAnalysts]
 *     responses:
 *       200:
 *         description: List of care analysts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CareAnalyst'
 *       500:
 *         description: Server error
 */
router.get('/', controller.getAllCareAnalysts);

/**
 * @swagger
 * /api/careanalysts/{id}:
 *   get:
 *     summary: Get a care analyst by ID
 *     tags: [CareAnalysts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Care analyst found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareAnalyst'
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/:id', controller.getCareAnalystById);

/**
 * @swagger
 * /api/careanalysts:
 *   post:
 *     summary: Create a new care analyst
 *     tags: [CareAnalysts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CareAnalyst'
 *     responses:
 *       201:
 *         description: Care analyst created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareAnalyst'
 *       400:
 *         description: Validation error
 */
router.post('/', controller.createCareAnalyst);

/**
 * @swagger
 * /api/careanalysts/{id}:
 *   put:
 *     summary: Update a care analyst
 *     tags: [CareAnalysts]
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
 *             $ref: '#/components/schemas/CareAnalyst'
 *     responses:
 *       200:
 *         description: Care analyst updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareAnalyst'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.updateCareAnalyst);

/**
 * @swagger
 * /api/careanalysts/{id}:
 *   delete:
 *     summary: Delete a care analyst
 *     tags: [CareAnalysts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Care analyst deleted
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', controller.deleteCareAnalyst);

module.exports = router;
