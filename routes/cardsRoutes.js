const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       required:
 *         - cardId
 *         - uid
 *         - cardType
 *         - cardVendor
 *         - cardLast4
 *         - cardExpDate
 *         - billingZip
 *         - fullname
 *         - fullcardnumber
 *         - userid
 *       properties:
 *         cardId:
 *           type: number
 *         uid:
 *           type: string
 *         cardType:
 *           type: string
 *         cardVendor:
 *           type: string
 *         cardLast4:
 *           type: string
 *         cardExpDate:
 *           type: string
 *         billingZip:
 *           type: string
 *         isActive:
 *           type: number
 *         cardbtn:
 *           type: string
 *         fullname:
 *           type: string
 *         fullcardnumber:
 *           type: string
 *         userid:
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
 * /cards:
 *   get:
 *     tags: [Cards]
 *     summary: Get all saved cards
 *     responses:
 *       200:
 *         description: List of cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Card"
 */
router.get("/", cardController.getCards);

/**
 * @swagger
 * /cards:
 *   post:
 *     tags: [Cards]
 *     summary: Add a new saved card
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Card"
 *     responses:
 *       201:
 *         description: Card created
 */
router.post("/", cardController.createCard);

/**
 * @swagger
 * /cards/{id}:
 *   get:
 *     tags: [Cards]
 *     summary: Get a card by Mongo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Card found
 *       404:
 *         description: Card not found
 */
router.get("/:id", cardController.getCardById);

/**
 * @swagger
 * /cards/{id}:
 *   put:
 *     tags: [Cards]
 *     summary: Update a saved card
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
 *             $ref: "#/components/schemas/Card"
 *     responses:
 *       200:
 *         description: Card updated
 *       404:
 *         description: Card not found
 */
router.put("/:id", cardController.updateCard);

/**
 * @swagger
 * /cards/{id}:
 *   delete:
 *     tags: [Cards]
 *     summary: Delete a saved card
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Card deleted
 *       404:
 *         description: Card not found
 */
router.delete("/:id", cardController.deleteCard);

/**
 * @swagger
 * /cards/user/{userid}:
 *   get:
 *     tags: [Cards]
 *     summary: Get all cards for a specific user
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Cards for the user
 */
router.get("/user/:userid", cardController.getCardsByUser);

module.exports = router;
