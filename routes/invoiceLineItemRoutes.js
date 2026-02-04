const express = require("express");
const router = express.Router();
const lineItemController = require("../controllers/invoiceLineItemController");

/**
 * @swagger
 * components:
 *   schemas:
 *     InvoiceLineItem:
 *       type: object
 *       required:
 *         - invoiceId
 *         - productId
 *         - quantity
 *         - listCost
 *         - unitCost
 *       properties:
 *         invoiceId:
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
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /invoice-line-items:
 *   get:
 *     tags: [Invoice Line Items]
 *     summary: Get all invoice line items
 *     responses:
 *       200:
 *         description: List of invoice line items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/InvoiceLineItem"
 */
router.get("/", lineItemController.getLineItems);

/**
 * @swagger
 * /invoice-line-items:
 *   post:
 *     tags: [Invoice Line Items]
 *     summary: Create a new invoice line item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/InvoiceLineItem"
 *     responses:
 *       201:
 *         description: Line item created
 */
router.post("/", lineItemController.createLineItem);

/**
 * @swagger
 * /invoice-line-items/{id}:
 *   get:
 *     tags: [Invoice Line Items]
 *     summary: Get a line item by ID
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
router.get("/:id", lineItemController.getLineItemById);

/**
 * @swagger
 * /invoice-line-items/{id}:
 *   put:
 *     tags: [Invoice Line Items]
 *     summary: Update a line item
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
 *             $ref: "#/components/schemas/InvoiceLineItem"
 *     responses:
 *       200:
 *         description: Line item updated
 *       404:
 *         description: Line item not found
 */
router.put("/:id", lineItemController.updateLineItem);

/**
 * @swagger
 * /invoice-line-items/{id}:
 *   delete:
 *     tags: [Invoice Line Items]
 *     summary: Delete a line item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Line item deleted
 *       404:
 *         description: Line item not found
 */
router.delete("/:id", lineItemController.deleteLineItem);

/**
 * @swagger
 * /invoice-line-items/invoice/{invoiceId}:
 *   get:
 *     tags: [Invoice Line Items]
 *     summary: Get all line items for a specific invoice
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Line items for the invoice
 */
router.get("/invoice/:invoiceId", lineItemController.getLineItemsByInvoice);

module.exports = router;
