// routes/businessDirectorRoutes.js
const express = require('express');
const router = express.Router();
const { objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);
const controller = require('../controllers/businessDirectorController');

/**
 * @swagger
 * tags:
 *   name: BusinessDirectors
 *   description: Business Director management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BusinessDirector:
 *       type: object
 *       required:
 *         - fullname
 *         - username
 *         - buid
 *         - buname
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
 *         buid:
 *           type: string
 *           description: Business Unit ID
 *         buname:
 *           type: string
 *           description: Business Unit name
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
 *         analystlist:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BusinessAnalyst'
 *         managerid:
 *           type: string
 *           description: ManagingDirector ObjectId this director reports to
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/businessdirectors:
 *   get:
 *     summary: Get all business directors
 *     tags: [BusinessDirectors]
 *     responses:
 *       200:
 *         description: List of business directors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BusinessDirector'
 *       500:
 *         description: Server error
 */
router.get('/', controller.getAllBusinessDirectors);

/**
 * @swagger
 * /api/businessdirectors/{id}:
 *   get:
 *     summary: Get a business director by ID
 *     tags: [BusinessDirectors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Business director found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessDirector'
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/:id', controller.getBusinessDirectorById);

/**
 * @swagger
 * /api/businessdirectors:
 *   post:
 *     summary: Create a new business director
 *     tags: [BusinessDirectors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessDirector'
 *     responses:
 *       201:
 *         description: Business director created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessDirector'
 *       400:
 *         description: Validation error
 */
router.post('/', controller.createBusinessDirector);

/**
 * @swagger
 * /api/businessdirectors/{id}:
 *   put:
 *     summary: Update a business director
 *     tags: [BusinessDirectors]
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
 *             $ref: '#/components/schemas/BusinessDirector'
 *     responses:
 *       200:
 *         description: Business director updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessDirector'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.updateBusinessDirector);

/**
 * @swagger
 * /api/businessdirectors/{id}:
 *   delete:
 *     summary: Delete a business director
 *     tags: [BusinessDirectors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Business director deleted
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', controller.deleteBusinessDirector);

module.exports = router;
