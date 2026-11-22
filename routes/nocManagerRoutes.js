// routes/nocManagerRoutes.js
const express = require('express');
const router = express.Router();
const { objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);
const controller = require('../controllers/nocManagerController');

/**
 * @swagger
 * tags:
 *   name: NocManagers
 *   description: NOC Manager management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NocManager:
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
 *             $ref: '#/components/schemas/NocTech'
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
 * /api/nocmanagers:
 *   get:
 *     summary: Get all NOC managers
 *     tags: [NocManagers]
 *     responses:
 *       200:
 *         description: List of NOC managers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NocManager'
 *       500:
 *         description: Server error
 */
router.get('/', controller.getAllNocManagers);

/**
 * @swagger
 * /api/nocmanagers/{id}:
 *   get:
 *     summary: Get a NOC manager by ID
 *     tags: [NocManagers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: NOC manager found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NocManager'
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/:id', controller.getNocManagerById);

/**
 * @swagger
 * /api/nocmanagers:
 *   post:
 *     summary: Create a new NOC manager
 *     tags: [NocManagers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NocManager'
 *     responses:
 *       201:
 *         description: NOC manager created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NocManager'
 *       400:
 *         description: Validation error
 */
router.post('/', controller.createNocManager);

/**
 * @swagger
 * /api/nocmanagers/{id}:
 *   put:
 *     summary: Update a NOC manager
 *     tags: [NocManagers]
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
 *             $ref: '#/components/schemas/NocManager'
 *     responses:
 *       200:
 *         description: NOC manager updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NocManager'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.updateNocManager);

/**
 * @swagger
 * /api/nocmanagers/{id}:
 *   delete:
 *     summary: Delete a NOC manager
 *     tags: [NocManagers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: NOC manager deleted
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', controller.deleteNocManager);

module.exports = router;
