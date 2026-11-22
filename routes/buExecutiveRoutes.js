// routes/buExecutiveRoutes.js
const express = require('express');
const router = express.Router();
const { objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);
const controller = require('../controllers/buExecutiveController');

/**
 * @swagger
 * tags:
 *   name: BUExecutives
 *   description: Business Unit Executives (Band hierarchy)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BUExecutive:
 *       type: object
 *       required:
 *         - fullname
 *         - username
 *         - title
 *         - band
 *         - buid
 *         - buname
 *         - orgunitid
 *         - orgunitname
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
 *         title:
 *           type: string
 *           enum:
 *             - President
 *             - VicePresident
 *             - ExecutiveVicePresident
 *             - Partner
 *             - ManagingPartner
 *             - Other
 *         band:
 *           type: number
 *           default: 1
 *           description: Band level (1 = top)
 *         buid:
 *           type: string
 *         buname:
 *           type: string
 *         orgunitid:
 *           type: string
 *         orgunitname:
 *           type: string
 *         directreports:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - refModel
 *               - refId
 *             properties:
 *               refModel:
 *                 type: string
 *                 description: BUExecutive, Director, or ManagingDirector
 *               refId:
 *                 type: string
 *         region:
 *           type: string
 *         specialitytype:
 *           type: string
 *         hiredate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [active, suspended, terminated, leave]
 *           default: active
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/buexecutives:
 *   get:
 *     summary: Get all BU executives
 *     tags: [BUExecutives]
 *     responses:
 *       200:
 *         description: List of BU executives
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BUExecutive'
 *       500:
 *         description: Server error
 */
router.get('/', controller.getAllBUExecutives);

/**
 * @swagger
 * /api/buexecutives/{id}:
 *   get:
 *     summary: Get a BU executive by ID
 *     tags: [BUExecutives]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: BU executive found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BUExecutive'
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/:id', controller.getBUExecutiveById);

/**
 * @swagger
 * /api/buexecutives:
 *   post:
 *     summary: Create a new BU executive
 *     tags: [BUExecutives]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BUExecutive'
 *     responses:
 *       201:
 *         description: BU executive created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BUExecutive'
 *       400:
 *         description: Validation error
 */
router.post('/', controller.createBUExecutive);

/**
 * @swagger
 * /api/buexecutives/{id}:
 *   put:
 *     summary: Update a BU executive
 *     tags: [BUExecutives]
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
 *             $ref: '#/components/schemas/BUExecutive'
 *     responses:
 *       200:
 *         description: BU executive updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BUExecutive'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.updateBUExecutive);

/**
 * @swagger
 * /api/buexecutives/{id}:
 *   delete:
 *     summary: Delete a BU executive
 *     tags: [BUExecutives]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: BU executive deleted
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', controller.deleteBUExecutive);

module.exports = router;
