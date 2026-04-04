// routes/quotation.routes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/quotation.controller");

/**
 * @swagger
 * tags:
 *   name: Quotations
 *   description: Quotation management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     QuotationHeader:
 *       type: object
 *       properties:
 *         quotationId:
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
 *         quotationDate:
 *           type: string
 *           format: date-time
 *         expiryDate:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *         notes:
 *           type: string
 *         salespersonId:
 *           type: string
 *         managerId:
 *           type: string
 *         businessUnit:
 *           type: string
 *         region:
 *           type: string
 *         branch:
 *           type: string
 *
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
 *
 *     CreateQuotationRequest:
 *       type: object
 *       properties:
 *         quotationId:
 *           type: number
 *         header:
 *           $ref: '#/components/schemas/QuotationHeader'
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuotationLine'
 */

/**
 * @swagger
 * /quotations:
 *   post:
 *     summary: Create a new quotation
 *     tags: [Quotations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuotationRequest'
 *     responses:
 *       201:
 *         description: Quotation created successfully
 */
router.post("/", controller.createQuotation);

/**
 * @swagger
 * /quotations:
 *   get:
 *     summary: Get all quotations
 *     tags: [Quotations]
 *     responses:
 *       200:
 *         description: List of quotations
 */
router.get("/", controller.getQuotations);

/**
 * @swagger
 * /quotations/{id}:
 *   get:
 *     summary: Get a quotation by ID
 *     tags: [Quotations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Quotation found
 *       404:
 *         description: Quotation not found
 */
router.get("/:id", controller.getQuotationById);

/**
 * @swagger
 * /quotations/{id}:
 *   put:
 *     summary: Update a quotation
 *     tags: [Quotations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuotationHeader'
 *     responses:
 *       200:
 *         description: Quotation updated
 */
router.put("/:id", controller.updateQuotation);

/**
 * @swagger
 * /quotations/{id}:
 *   delete:
 *     summary: Delete a quotation
 *     tags: [Quotations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Quotation deleted
 */
router.delete("/:id", controller.deleteQuotation);

/**
 * @swagger
 * /quotations/user/{userId}:
 *   get:
 *     summary: Get quotations by customer/user ID
 *     tags: [Quotations]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quotations for the user
 */
router.get("/user/:userId", controller.getQuotationsByUserId);

/**
 * @swagger
 * /quotations/sales/{salesId}:
 *   get:
 *     summary: Get quotations by salesperson ID
 *     tags: [Quotations]
 *     parameters:
 *       - in: path
 *         name: salesId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quotations for the salesperson
 */
router.get("/sales/:salesId", controller.getQuotationsBySalespersonId);

/**
 * @swagger
 * /quotations/{id}/accept:
 *   post:
 *     summary: Accept a quotation and generate an invoice
 *     tags: [Quotations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Quotation accepted
 */
router.post("/:id/accept", controller.acceptQuotation);

module.exports = router;
