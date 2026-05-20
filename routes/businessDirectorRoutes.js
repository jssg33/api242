// routes/businessDirectorRoutes.js
const express = require('express');
const router = express.Router();
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
 *             $ref: '#/components/schemas/BusinessAnalyst'
 */

router.get('/', controller.getAllBusinessDirectors);
router.get('/:id', controller.getBusinessDirectorById);
router.post('/', controller.createBusinessDirector);
router.put('/:id', controller.updateBusinessDirector);
router.delete('/:id', controller.deleteBusinessDirector);

module.exports = router;
