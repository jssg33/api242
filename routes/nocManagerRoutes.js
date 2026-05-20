// routes/nocManagerRoutes.js
const express = require('express');
const router = express.Router();
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
 */

router.get('/', controller.getAllNocManagers);
router.get('/:id', controller.getNocManagerById);
router.post('/', controller.createNocManager);
router.put('/:id', controller.updateNocManager);
router.delete('/:id', controller.deleteNocManager);

module.exports = router;
