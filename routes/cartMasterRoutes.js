const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartMasterController");

/**
 * @openapi
 * components:
 *   schemas:
 *     CartMaster:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         id:
 *           type: number
 *         userId:
 *           type: number
 *         cartsCount:
 *           type: number
 *         cartsCancelled:
 *           type: number
 *         cartsActive:
 *           type: number
 *         cartsActiveList:
 *           type: string
 *         loyaltyid:
 *           type: string
 *         loyaltyvendor:
 *           type: string
 *         useridstring:
 *           type: string
 *       example:
 *         id: 1
 *         userId: 42
 *         cartsCount: 5
 *         cartsCancelled: 1
 *         cartsActive: 2
 *         cartsActiveList: "12,14"
 *         loyaltyid: "ABC123"
 *         loyaltyvendor: "VendorX"
 *         useridstring: "42"
 */

/**
 * @openapi
 * /cartmaster:
 *   get:
 *     summary: Get all CartMaster records
 *     tags: [CartMaster]
 *     responses:
 *       200:
 *         description: List of CartMaster entries
 */
router.get("/", controller.getAllCartMasters);

/**
 * @openapi
 * /cartmaster/{id}:
 *   get:
 *     summary: Get a CartMaster by ID
 *     tags: [CartMaster]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: CartMaster found
 *       404:
 *         description: Not found
 */
router.get("/:id", controller.getCartMasterById);

/**
 * @openapi
 * /cartmaster:
 *   post:
 *     summary: Create a CartMaster entry
 *     tags: [CartMaster]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartMaster'
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", controller.createCartMaster);

/**
 * @openapi
 * /cartmaster/{id}:
 *   put:
 *     summary: Update a CartMaster entry
 *     tags: [CartMaster]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartMaster'
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put("/:id", controller.updateCartMaster);

/**
 * @openapi
 * /cartmaster/{id}:
 *   delete:
 *     summary: Delete a CartMaster entry
 *     tags: [CartMaster]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete("/:id", controller.deleteCartMaster);

module.exports = router;

