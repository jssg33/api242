const express = require('express');
const router = express.Router();
const controller = require('../controllers/batchController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Batch:
 *       type: object
 *       required:
 *         - id
 *         - batchname
 *       properties:
 *         id:
 *           type: integer
 *         batchname:
 *           type: string
 *         filelocationpath:
 *           type: string
 *         batchtype:
 *           type: integer
 *         batchstatus:
 *           type: integer
 *         batchstart:
 *           type: string
 *           format: date-time
 *         batchend:
 *           type: string
 *           format: date-time
 *         qtystart:
 *           type: integer
 *         qtyend:
 *           type: integer
 *         qtyexpected:
 *           type: integer
 *         qtyactual:
 *           type: integer
 *         qtyerror:
 *           type: integer
 *         qty:
 *           type: integer
 *       example:
 *         id: 1
 *         batchname: "Nightly Import"
 *         filelocationpath: "/data/imports/batch1.csv"
 *         batchtype: 2
 *         batchstatus: 1
 *         batchstart: "2026-02-05T00:27:53.038Z"
 *         batchend: "2026-02-05T00:45:10.000Z"
 *         qtystart: 0
 *         qtyend: 500
 *         qtyexpected: 500
 *         qtyactual: 498
 *         qtyerror: 2
 *         qty: 500
 */

/**
 * @swagger
 * /api/batches:
 *   get:
 *     summary: Get all batches
 *     tags: [Batch]
 *     responses:
 *       200:
 *         description: List of batches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Batch'
 */
router.get('/', controller.getAllBatches);

/**
 * @swagger
 * /api/batches/{id}:
 *   get:
 *     summary: Get a batch by ID
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the batch
 *     responses:
 *       200:
 *         description: Batch found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Batch'
 *       404:
 *         description: Batch not found
 */
router.get('/:id', controller.getBatchById);

/**
 * @swagger
 * /api/batches:
 *   post:
 *     summary: Create a new batch
 *     tags: [Batch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Batch'
 *     responses:
 *       201:
 *         description: Batch created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Batch'
 */
router.post('/', controller.createBatch);

module.exports = router;
