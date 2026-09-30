const express = require("express");
const router = express.Router();
const personalPageContentController = require("../controllers/personalPageContentController");

/**
 * @openapi
 * components:
 *   schemas:
 *     PersonalPageContent:
 *       type: object
 *       required:
 *         - pageKey
 *         - data
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *         pageKey:
 *           type: string
 *           description: Page slug, e.g. "awards", "vitae", "usc"
 *         data:
 *           type: object
 *           description: Arbitrary page content — shape matches whatever that page component renders
 *         updatedBy:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "67a1b2c3d4e5f6a7b8c9d0e1"
 *         pageKey: "awards"
 *         data:
 *           name: "John S. Stritzinger"
 *           subtitle: "Global Tech Executive"
 *           description: "This section showcases the professional awards..."
 *           awards: []
 *         updatedBy: "john"
 */

/**
 * @openapi
 * /personalpages:
 *   get:
 *     summary: Get all personal page content records
 *     tags:
 *       - PersonalPages
 *     responses:
 *       200:
 *         description: List of personal page content records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PersonalPageContent'
 */
router.get("/", personalPageContentController.getAllPersonalPageContent);

/**
 * @openapi
 * /personalpages/{pageKey}:
 *   get:
 *     summary: Get one personal page's content by its slug
 *     tags:
 *       - PersonalPages
 *     parameters:
 *       - in: path
 *         name: pageKey
 *         required: true
 *         schema:
 *           type: string
 *         description: Page slug
 *         example: awards
 *     responses:
 *       200:
 *         description: The page's content
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonalPageContent'
 *       404:
 *         description: Page content not found
 */
router.get("/:pageKey", personalPageContentController.getPersonalPageContentByKey);

/**
 * @openapi
 * /personalpages:
 *   post:
 *     summary: Create a new personal page content record
 *     tags:
 *       - PersonalPages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonalPageContent'
 *     responses:
 *       201:
 *         description: Personal page content created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonalPageContent'
 *       400:
 *         description: Invalid input
 */
router.post("/", personalPageContentController.createPersonalPageContent);

/**
 * @openapi
 * /personalpages/{id}:
 *   put:
 *     summary: Update a personal page content record
 *     tags:
 *       - PersonalPages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Personal page content record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonalPageContent'
 *     responses:
 *       200:
 *         description: Personal page content updated
 *       404:
 *         description: Personal page content not found
 */
router.put("/:id", personalPageContentController.updatePersonalPageContent);

/**
 * @openapi
 * /personalpages/{id}:
 *   delete:
 *     summary: Delete a personal page content record
 *     tags:
 *       - PersonalPages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Personal page content record ID
 *     responses:
 *       200:
 *         description: Personal page content deleted
 *       404:
 *         description: Personal page content not found
 */
router.delete("/:id", personalPageContentController.deletePersonalPageContent);

module.exports = router;
