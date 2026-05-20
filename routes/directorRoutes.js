// routes/directorRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/directorController');

/**
 * @swagger
 * tags:
 *   name: Directors
 *   description: Generic company directors tied to a Business Unit
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Director:
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
 *         buname:
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
 *         managerid:
 *           type: string
 */

/**
 * @swagger
 * /api/directors:
 *   get:
 *     summary: Get all directors
 *     tags: [Directors]
 */
router.get('/', controller.getAllDirectors);

/**
 * @swagger
 * /api/directors/{id}:
 *   get:
 *     summary: Get a director by ID
 *     tags: [Directors]
 */
router.get('/:id', controller.getDirectorById);

/**
 * @swagger
 * /api/directors:
 *   post:
 *     summary: Create a new director
 *     tags: [Directors]
 */
router.post('/', controller.createDirector);

/**
 * @swagger
 * /api/directors/{id}:
 *   put:
 *     summary: Update a director
 *     tags: [Directors]
 */
router.put('/:id', controller.updateDirector);

/**
 * @swagger
 * /api/directors/{id}:
 *   delete:
 *     summary: Delete a director
 *     tags: [Directors]
 */
router.delete('/:id', controller.deleteDirector);

module.exports = router;
