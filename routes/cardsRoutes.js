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
 *         - mongoid
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
 *         mongoid:
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
 *     summary: Get a card by Mongo _id
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
 *     summary: Update a saved card by Mongo _id
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
 *     summary: Delete a saved card by Mongo _id
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

/* ---------------------------------------------------------
   NEW CRUD ROUTES BY mongoid
--------------------------------------------------------- */

/**
 * @swagger
 * /cards/mongoid/{mongoid}:
 *   get:
 *     tags: [Cards]
 *     summary: Get a card by mongoid
 *     parameters:
 *       - in: path
 *         name: mongoid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Card found
 *       404:
 *         description: Card not found
 */
router.get("/mongoid/:mongoid", cardController.getCardByMongoId);

/**
 * @swagger
 * /cards/mongoid/{mongoid}:
 *   put:
 *     tags: [Cards]
 *     summary: Update a card by mongoid
 *     parameters:
 *       - in: path
 *         name: mongoid
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
router.put("/mongoid/:mongoid", cardController.updateCardByMongoId);

/**
 * @swagger
 * /cards/mongoid/{mongoid}:
 *   delete:
 *     tags: [Cards]
 *     summary: Delete a card by mongoid
 *     parameters:
 *       - in: path
 *         name: mongoid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Card deleted
 *       404:
 *         description: Card not found
 */
router.delete("/mongoid/:mongoid", cardController.deleteCardByMongoId);

/* ---------------------------------------------------------
   USER FILTER ROUTES
--------------------------------------------------------- */

/**
 * @swagger
 * /cards/user/{userid}:
 *   get:
 *     tags: [Cards]
 *     summary: Get all cards for a specific user (by userid)
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

/**
 * @swagger
 * /cards/user/uid/{uid}:
 *   get:
 *     tags: [Cards]
 *     summary: Get all cards for a specific user (by uid)
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cards for the user by uid
 */
router.get("/user/uid/:uid", cardController.getCardsByUid);

module.exports = router;


module.exports = router;
