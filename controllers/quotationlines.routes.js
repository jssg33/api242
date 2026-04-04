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

router.post("/", controller.createQuotationLine);

router.get("/quotation/:quotationId", controller.getLinesByQuotationId);

/**
 * @swagger
 * /quotationlines/user/{userId}:
 *   get:
 *     summary: Get quotation line items by user/customer ID
 *     tags: [QuotationLines]
 */
router.get("/user/:userId", controller.getLinesByUserId);

/**
 * @swagger
 * /quotationlines/sales/{salesId}:
 *   get:
 *     summary: Get quotation line items by salesperson ID
 *     tags: [QuotationLines]
 */
router.get("/sales/:salesId", controller.getLinesBySalespersonId);

router.get("/:id", controller.getQuotationLineById);
router.put("/:id", controller.updateQuotationLine);
router.delete("/:id", controller.deleteQuotationLine);

module.exports = router;
