// routes/businessAnalystRoutes.js
const express = require('express');
const router = express.Router();
const { objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);
const controller = require('../controllers/businessAnalystController');

/**
 * @swagger
 * tags:
 *   name: BusinessAnalysts
 *   description: Business Analyst management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BusinessAnalyst:
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
 */

/**
 * @swagger
 * /api/businessanalysts:
 *   get:
 *     summary: Get all business analysts
 *     tags: [BusinessAnalysts]
 *     responses:
 *       200:
 *         description: List of business analysts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BusinessAnalyst'
 *       500:
 *         description: Server error
 */
router.get('/', controller.getAllBusinessAnalysts);

/**
 * @swagger
 * /api/businessanalysts/{id}:
 *   get:
 *     summary: Get a business analyst by ID
 *     tags: [BusinessAnalysts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Business analyst found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessAnalyst'
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/:id', controller.getBusinessAnalystById);

/**
 * @swagger
 * /api/businessanalysts:
 *   post:
 *     summary: Create a new business analyst
 *     tags: [BusinessAnalysts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessAnalyst'
 *     responses:
 *       201:
 *         description: Business analyst created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessAnalyst'
 *       400:
 *         description: Validation error
 */
router.post('/', controller.createBusinessAnalyst);

/**
 * @swagger
 * /api/businessanalysts/{id}:
 *   put:
 *     summary: Update a business analyst
 *     tags: [BusinessAnalysts]
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
 *             $ref: '#/components/schemas/BusinessAnalyst'
 *     responses:
 *       200:
 *         description: Business analyst updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessAnalyst'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.updateBusinessAnalyst);

/**
 * @swagger
 * /api/businessanalysts/{id}:
 *   delete:
 *     summary: Delete a business analyst
 *     tags: [BusinessAnalysts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Business analyst deleted
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', controller.deleteBusinessAnalyst);

module.exports = router;
