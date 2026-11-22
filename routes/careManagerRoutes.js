// routes/careManagerRoutes.js
const express = require('express');
const router = express.Router();
const { objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);
const controller = require('../controllers/careManagerController');

/**
 * @swagger
 * tags:
 *   name: CareManagers
 *   description: Customer Care Manager management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CareManager:
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
 *         analystlist:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CareAnalyst'
 */

/**
 * @swagger
 * /api/caremanagers:
 *   get:
 *     summary: Get all care managers
 *     tags: [CareManagers]
 *     responses:
 *       200:
 *         description: List of care managers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CareManager'
 *       500:
 *         description: Server error
 */
router.get('/', controller.getAllCareManagers);

/**
 * @swagger
 * /api/caremanagers/{id}:
 *   get:
 *     summary: Get a care manager by ID
 *     tags: [CareManagers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Care manager found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareManager'
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/:id', controller.getCareManagerById);

/**
 * @swagger
 * /api/caremanagers:
 *   post:
 *     summary: Create a new care manager
 *     tags: [CareManagers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CareManager'
 *     responses:
 *       201:
 *         description: Care manager created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareManager'
 *       400:
 *         description: Validation error
 */
router.post('/', controller.createCareManager);

/**
 * @swagger
 * /api/caremanagers/{id}:
 *   put:
 *     summary: Update a care manager
 *     tags: [CareManagers]
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
 *             $ref: '#/components/schemas/CareManager'
 *     responses:
 *       200:
 *         description: Care manager updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareManager'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.updateCareManager);

/**
 * @swagger
 * /api/caremanagers/{id}:
 *   delete:
 *     summary: Delete a care manager
 *     tags: [CareManagers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Care manager deleted
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', controller.deleteCareManager);

module.exports = router;
