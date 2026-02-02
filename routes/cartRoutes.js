const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");

/**
 * @openapi
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - cartId
 *       properties:
 *         id:
 *           type: number
 *         cartId:
 *           type: number
 *         uid:
 *           type: string
 *         licenseId:
 *           type: number
 *         itemType:
 *           type: string
 *         itemDescription:
 *           type: string
 *         quantity:
 *           type: number
 *         unitPrice:
 *           type: number
 *         totalPrice:
 *           type: number
 *         dateAdded:
 *           type: string
 *         isCheckedOut:
 *           type: number
 *         paymentid:
 *           type: string
 *         bookinginfo:
 *           type: string
 *         licensename:
 *           type: string
 *         userid:
 *           type: number
 *       example:
 *         id: 1
 *         cartId: 1001
 *         uid: "abc123"
 *         licenseId: 55
 *         itemType: "ticket"
 *         itemDescription: "General Admission"
 *         quantity: 2
 *         unitPrice: 25
 *         totalPrice: 50
 *         dateAdded: "2026-02-02"
 *         isCheckedOut: 0
 *         paymentid: "PAY123"
 *         bookinginfo: "N/A"
 *         licensename: "State License"
 *         userid: 42
 */

/**
 * @openapi
 * /cart:
 *   get:
 *     summary: Get all carts
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: List of carts
 */
router.get("/", controller.getAllCarts);

/**
 * @openapi
 * /cart/{id}:
 *   get:
 *     summary: Get a cart by ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Cart found
 *       404:
 *         description: Not found
 */
router.get("/:id", controller.getCartById);

/**
 * @openapi
 * /cart:
 *   post:
 *     summary: Create a cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", controller.createCart);

/**
 * @openapi
 * /cart/{id}:
 *   put:
 *     summary: Update a cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put("/:id", controller.updateCart);

/**
 * @openapi
 * /cart/{id}:
 *   delete:
 *     summary: Delete a cart
 *     tags: [Cart]
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
router.delete("/:id", controller.deleteCart);

module.exports = router;

