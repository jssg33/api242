// routes/managingDirectorRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/managingDirectorController');

/**
 * @swagger
 * tags:
 *   name: ManagingDirectors
 *   description: Executive-level directors who manage Directors and Business Directors
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ManagingDirector:
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
 *         specialitytype:
 *           type: string
 *         hiredate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [active, suspended, terminated, leave]
 *         directorlist:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Director'
 *         businessdirectorlist:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BusinessDirector'
 */

/**
 * @swagger
 * /api/managingdirectors:
 *   get:
 *     summary: Get all managing directors
 *     tags: [ManagingDirectors]
 */
router.get('/', controller.getAllManagingDirectors);

/**
 * @swagger
 * /api/managingdirectors/{id}:
 *   get:
 *     summary: Get a managing director by ID
 *     tags: [ManagingDirectors]
 */
router.get('/:id', controller.getManagingDirectorById);

/**
 * @swagger
 * /api/managingdirectors:
 *   post:
 *     summary: Create a new managing director
 *     tags: [ManagingDirectors]
 */
router.post('/', controller.createManagingDirector);

/**
 * @swagger
 * /api/managingdirectors/{id}:
 *   put:
 *     summary: Update a managing director
 *     tags: [ManagingDirectors]
 */
router.put('/:id', controller.updateManagingDirector);

/**
 * @swagger
 * /api/managingdirectors/{id}:
 *   delete:
 *     summary: Delete a managing director
 *     tags: [ManagingDirectors]
 */
router.delete('/:id', controller.deleteManagingDirector);

module.exports = router;
