// routes/provisioningManagerRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/provisioningManagerController');

/**
 * @swagger
 * tags:
 *   name: ProvisioningManagers
 *   description: Provisioning Manager management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProvisioningManager:
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
 *         provisionerlist:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Provisioner'
 */

/**
 * @swagger
 * /api/provisioningmanagers:
 *   get:
 *     summary: Get all provisioning managers
 *     tags: [ProvisioningManagers]
 */
router.get('/', controller.getAllProvisioningManagers);

/**
 * @swagger
 * /api/provisioningmanagers/{id}:
 *   get:
 *     summary: Get a provisioning manager by ID
 *     tags: [ProvisioningManagers]
 */
router.get('/:id', controller.getProvisioningManagerById);

/**
 * @swagger
 * /api/provisioningmanagers:
 *   post:
 *     summary: Create a new provisioning manager
 *     tags: [ProvisioningManagers]
 */
router.post('/', controller.createProvisioningManager);

/**
 * @swagger
 * /api/provisioningmanagers/{id}:
 *   put:
 *     summary: Update a provisioning manager
 *     tags: [ProvisioningManagers]
 */
router.put('/:id', controller.updateProvisioningManager);

/**
 * @swagger
 * /api/provisioningmanagers/{id}:
 *   delete:
 *     summary: Delete a provisioning manager
 *     tags: [ProvisioningManagers]
 */
router.delete('/:id', controller.deleteProvisioningManager);

module.exports = router;
