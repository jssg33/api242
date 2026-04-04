// routes/quotationlines.routes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/quotationlines.controller");

/**
 * @swagger
 * tags:
 *   name: QuotationLines
 *   description: Quotation line item API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     QuotationLine:
 *       type: object
 *       properties:
 *         quotationId:
 *           type: number
 *         productId:
 *           type: string
 *         description:
 *           type: string
 *         quantity:
 *           type: number
 *         listCost:
 *           type: number
 *         unitCost:
 *           type: number
 *         discountAmount:
 *           type: number
 *         taxAmount:
 *           type: number
 *         lineSubtotal:
 *           type: number
 *         lineTotal:
 *           type: number
 *         salespersonId:
 *           type: string
 *         customerId:
 *           type: string
 */

/**
 * @swagger
 * /quotationlines:
 *   post:
 *     summary: Create a quotation line item
 *     tags: [QuotationLines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuotationLine'
 *     responses:
 *       201:
 *         description: Line item created
 */
router.post("/", controller.createQuotationLine);

/**
 * @swagger
 * /quotationlines:
 *   get:
 *     summary: Get all quotation line items
 *     tags: [QuotationLines]
 *     responses:
 *       200:
 *         description: List of all line items
 */
router.get("/", controller.getAllQuotationLines);

/**
 * @swagger
 * /quotationlines/quotation/{quotationId}:
 *   get:
 *     summary: Get all line items for a quotation
 *     tags: [QuotationLines]
 *     parameters:
 *       - in: path
 *         name: quotationId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of line items for the quotation
 */
router.get("/quotation/:quotationId", controller.getLinesByQuotationId);

/**
 * @swagger
 * /quotationlines/user/{userId}:
 *   get:
 *     summary: Get quotation line items by user/customer ID
 *     tags: [QuotationLines]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Line items for the user
 */
router.get("/user/:userId", controller.getLinesByUserId);

/**
 * @swagger
 * /quotationlines/sales/{salesId}:
 *   get:
 *     summary: Get quotation line items by salesperson ID
 *     tags: [QuotationLines]
 *     parameters:
 *       - in: path
 *         name: salesId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Line items for the salesperson
 */
router.get("/sales/:salesId", controller.getLinesBySalespersonId);

/**
 * @swagger
 * /quotationlines/{id}:
 *   get:
 *     summary: Get a quotation line item by ID
 *     tags: [QuotationLines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Line item found
 *       404:
 *         description: Line item not found
 */
router.get("/:id", controller.getQuotationLineById);

/**
 * @swagger
 * /quotationlines/{id}:
 *   put:
 *     summary: Update a quotation line item
 *     tags: [QuotationLines]
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
 *             $ref: '#/components/schemas/QuotationLine'
 *     responses:
 *       200:
 *         description: Line item updated
 */
router.put("/:id", controller.updateQuotationLine);

/**
 * @swagger
 * /quotationlines/{id}:
 *   delete:
 *     summary: Delete a quotation line item
 *     tags: [QuotationLines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Line item deleted
 */
router.delete("/:id", controller.deleteQuotationLine);

module.exports = router;
