// routes/nocTechRoutes.js
const express = require('express');
const router = express.Router();
const { objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);
const controller = require('../controllers/nocTechController');

/**
 * @swagger
 * tags:
 *   name: NocTechs
 *   description: NOC Technician management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NocTech:
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
 * /api/noctechs:
 *   get:
 *     summary: Get all NOC techs
 *     tags: [NocTechs]
 *     responses:
 *       200:
 *         description: List of NOC techs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NocTech'
 *       500:
 *         description: Server error
 */
router.get('/', controller.getAllNocTechs);

/**
 * @swagger
 * /api/noctechs/{id}:
 *   get:
 *     summary: Get a NOC tech by ID
 *     tags: [NocTechs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: NOC tech found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NocTech'
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/:id', controller.getNocTechById);

/**
 * @swagger
 * /api/noctechs:
 *   post:
 *     summary: Create a new NOC tech
 *     tags: [NocTechs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NocTech'
 *     responses:
 *       201:
 *         description: NOC tech created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NocTech'
 *       400:
 *         description: Validation error
 */
router.post('/', controller.createNocTech);

/**
 * @swagger
 * /api/noctechs/{id}:
 *   put:
 *     summary: Update a NOC tech
 *     tags: [NocTechs]
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
 *             $ref: '#/components/schemas/NocTech'
 *     responses:
 *       200:
 *         description: NOC tech updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NocTech'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.updateNocTech);

/**
 * @swagger
 * /api/noctechs/{id}:
 *   delete:
 *     summary: Delete a NOC tech
 *     tags: [NocTechs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: NOC tech deleted
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', controller.deleteNocTech);

module.exports = router;
