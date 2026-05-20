// routes/provisionerRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/provisionerController');

/**
 * @swagger
 * tags:
 *   name: Provisioners
 *   description: Provisioner management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Provisioner:
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
 * /api/provisioners:
 *   get:
 *     summary: Get all provisioners
 *     tags: [Provisioners]
 *     responses:
 *       200:
 *         description: List of provisioners
 */
router.get('/', controller.getAllProvisioners);

/**
 * @swagger
 * /api/provisioners/{id}:
 *   get:
 *     summary: Get a provisioner by ID
 *     tags: [Provisioners]
 */
router.get('/:id', controller.getProvisionerById);

/**
 * @swagger
 * /api/provisioners:
 *   post:
 *     summary: Create a new provisioner
 *     tags: [Provisioners]
 */
router.post('/', controller.createProvisioner);

/**
 * @swagger
 * /api/provisioners/{id}:
 *   put:
 *     summary: Update a provisioner
 *     tags: [Provisioners]
 */
router.put('/:id', controller.updateProvisioner);

/**
 * @swagger
 * /api/provisioners/{id}:
 *   delete:
 *     summary: Delete a provisioner
 *     tags: [Provisioners]
 */
router.delete('/:id', controller.deleteProvisioner);

module.exports = router;
