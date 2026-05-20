// routes/nocTechRoutes.js
const express = require('express');
const router = express.Router();
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
 */

router.get('/', controller.getAllNocTechs);
router.get('/:id', controller.getNocTechById);
router.post('/', controller.createNocTech);
router.put('/:id', controller.updateNocTech);
router.delete('/:id', controller.deleteNocTech);

module.exports = router;
