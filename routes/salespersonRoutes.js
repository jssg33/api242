// routes/salespersonRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/salespersonController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Salesperson:
 *       type: object
 *       required:
 *         - fullname
 *         - username
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
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
 *       example:
 *         fullname: John Doe
 *         username: jdoe
 *         firstname: John
 *         address1: 123 Main St
 *         city: New York
 *         state: NY
 *         zip: 10001
 *         phone: "555-1234"
 *         cell: "555-5678"
 *         btn: "BTN123"
 *         managerid: "60f7c0b8c2a4f72f9c8e1234"
 *         region: East
 *         bu: Sales
 *         specialitytype: Medical
 *         hiredate: 2024-01-01
 *         status: active
 */

/**
 * @swagger
 * /api/salespeople:
 *   post:
 *     summary: Create a new salesperson
 *     tags: [Salesperson]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Salesperson'
 *     responses:
 *       201:
 *         description: Salesperson created
 */
router.post('/', controller.createSalesperson);

/**
 * @swagger
 * /api/salespeople:
 *   get:
 *     summary: Get all salespeople
 *     tags: [Salesperson]
 *     responses:
 *       200:
 *         description: List of salespeople
 */
router.get('/', controller.getSalespeople);

/**
 * @swagger
 * /api/salespeople/{id}:
 *   get:
 *     summary: Get a salesperson by ID
 *     tags: [Salesperson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Salesperson found
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getSalespersonById);

/**
 * @swagger
 * /api/salespeople/{id}:
 *   put:
 *     summary: Update a salesperson
 *     tags: [Salesperson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Salesperson'
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.updateSalesperson);

/**
 * @swagger
 * /api/salespeople/{id}:
 *   delete:
 *     summary: Delete a salesperson
 *     tags: [Salesperson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */
router.delete('/:id', controller.deleteSalesperson);

module.exports = router;
