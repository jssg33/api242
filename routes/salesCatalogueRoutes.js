const express = require("express");
const router = express.Router();
const salesCatalogueController = require("../controllers/salesCatalogueController");

/**
 * @swagger
 * components:
 *   schemas:
 *     SalesCatalogue:
 *       type: object
 *       required:
 *         - salesCatalogueId
 *         - parkId
 *         - serviceType
 *         - serviceName
 *         - price
 *       properties:
 *         salesCatalogueId:
 *           type: number
 *         parkId:
 *           type: number
 *         serviceType:
 *           type: string
 *         serviceName:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         isActive:
 *           type: number
 *         state:
 *           type: number
 *         global:
 *           type: number
 *         qtyadults:
 *           type: number
 *         qtychildren:
 *           type: number
 *         national:
 *           type: number
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         productclass:
 *           type: string
 *         siteid:
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
 * /sales-catalogue:
 *   get:
 *     tags: [Sales Catalogue]
 *     summary: Get all sales catalogue items
 *     responses:
 *       200:
 *         description: List of catalogue items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/SalesCatalogue"
 */
router.get("/", salesCatalogueController.getItems);

/**
 * @swagger
 * /sales-catalogue:
 *   post:
 *     tags: [Sales Catalogue]
 *     summary: Create a new sales catalogue item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SalesCatalogue"
 *     responses:
 *       201:
 *         description: Catalogue item created
 */
router.post("/", salesCatalogueController.createItem);

/**
 * @swagger
 * /sales-catalogue/{id}:
 *   get:
 *     tags: [Sales Catalogue]
 *     summary: Get a catalogue item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catalogue item found
 *       404:
 *         description: Catalogue item not found
 */
router.get("/:id", salesCatalogueController.getItemById);

/**
 * @swagger
 * /sales-catalogue/{id}:
 *   put:
 *     tags: [Sales Catalogue]
 *     summary: Update a catalogue item
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
 *             $ref: "#/components/schemas/SalesCatalogue"
 *     responses:
 *       200:
 *         description: Catalogue item updated
 *       404:
 *         description: Catalogue item not found
 */
router.put("/:id", salesCatalogueController.updateItem);

/**
 * @swagger
 * /sales-catalogue/{id}:
 *   delete:
 *     tags: [Sales Catalogue]
 *     summary: Delete a catalogue item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catalogue item deleted
 *       404:
 *         description: Catalogue item not found
 */
router.delete("/:id", salesCatalogueController.deleteItem);

/**
 * @swagger
 * /sales-catalogue/park/{parkId}:
 *   get:
 *     tags: [Sales Catalogue]
 *     summary: Get catalogue items by park ID
 *     parameters:
 *       - in: path
 *         name: parkId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Catalogue items for the park
 */
router.get("/park/:parkId", salesCatalogueController.getItemsByPark);

module.exports = router;
