const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       required:
 *         - invoiceId
 *         - customerId
 *         - accountId
 *         - subAccountId
 *         - invoiceDate
 *       properties:
 *         invoiceId:
 *           type: number
 *         customerId:
 *           type: string
 *         accountId:
 *           type: string
 *         subAccountId:
 *           type: string
 *         billToAddress1:
 *           type: string
 *         billToAddress2:
 *           type: string
 *         billToCity:
 *           type: string
 *         billToState:
 *           type: string
 *         billToPostalZip:
 *           type: string
 *         billToCountry:
 *           type: string
 *         shipToAddress1:
 *           type: string
 *         shipToAddress2:
 *           type: string
 *         shipToCity:
 *           type: string
 *         shipToState:
 *           type: string
 *         shipToPostalZip:
 *           type: string
 *         shipToCountry:
 *           type: string
 *         subtotal:
 *           type: number
 *         taxTotal:
 *           type: number
 *         discountTotal:
 *           type: number
 *         grandTotal:
 *           type: number
 *         invoiceDate:
 *           type: string
 *           format: date-time
 *         dueDate:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [draft, open, paid, void]
 *         notes:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /invoices:
 *   get:
 *     tags: [Invoices]
 *     summary: Get all invoices
 *     responses:
 *       200:
 *         description: List of invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Invoice"
 */
router.get("/", invoiceController.getInvoices);

/**
 * @swagger
 * /invoices:
 *   post:
 *     tags: [Invoices]
 *     summary: Create a new invoice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Invoice"
 *     responses:
 *       201:
 *         description: Invoice created
 */
router.post("/", invoiceController.createInvoice);

/**
 * @swagger
 * /invoices/{id}:
 *   get:
 *     tags: [Invoices]
 *     summary: Get an invoice by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice found
 *       404:
 *         description: Invoice not found
 */
router.get("/:id", invoiceController.getInvoiceById);

/**
 * @swagger
 * /invoices/{id}:
 *   put:
 *     tags: [Invoices]
 *     summary: Update an invoice
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
 *             $ref: "#/components/schemas/Invoice"
 *     responses:
 *       200:
 *         description: Invoice updated
 *       404:
 *         description: Invoice not found
 */
router.put("/:id", invoiceController.updateInvoice);

/**
 * @swagger
 * /invoices/{id}:
 *   delete:
 *     tags: [Invoices]
 *     summary: Delete an invoice
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice deleted
 *       404:
 *         description: Invoice not found
 */
router.delete("/:id", invoiceController.deleteInvoice);

/**
 * @swagger
 * /invoices/customer/{customerId}:
 *   get:
 *     tags: [Invoices]
 *     summary: Get invoices by customer ID
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoices for the customer
 */
router.get("/customer/:customerId", invoiceController.getInvoicesByCustomer);

module.exports = router;
