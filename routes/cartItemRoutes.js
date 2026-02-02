const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartItemController");

/**
 * @openapi
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - cartid
 *       properties:
 *         id:
 *           type: number
 *         cartid:
 *           type: number
 *         itemvendor:
 *           type: string
 *         itemdescription:
 *           type: string
 *         itemqty:
 *           type: number
 *         itemtotals:
 *           type: number
 *         productid:
 *           type: string
 *         productname:
 *           type: string
 *         userid:
 *           type: number
 *       example:
 *         id: 1
 *         cartid: 1001
 *         itemvendor: "VendorX"
 *         itemdescription: "Camping Tent"
 *         itemqty: 1
 *         itemtotals: 99.99
 *         productid: "P123"
 *         productname: "Tent"
 *         userid: 42
 */

/**
 * @openapi
 * /cartitems:
 *   get:
 *     summary: Get all cart items
 *     tags: [CartItem]
 *     responses:
 *       200:
 *         description: List of cart items
 */
router.get("/", controller.getAllCartItems);

/**
 * @openapi
 * /cartitems/{id}:
 *   get:
 *     summary: Get a cart item by ID
 *     tags: [CartItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Cart item found
 *       404:
 *         description: Not found
 */
router.get("/:id", controller.getCartItemById);

/**
 * @openapi
 * /cartitems/cart/{cartid}:
 *   get:
 *     summary: Get all items for a specific cart
 *     tags: [CartItem]
 *     parameters:
 *       - in: path
 *         name: cartid
 *         required: true
 *     responses:
 *       200:
 *         description: List of items for the cart
 */
router.get("/cart/:cartid", controller.getCartItemsByCartId);

/**
 * @openapi
 * /cartitems:
 *   post:
 *     summary: Create a cart item
 *     tags: [CartItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", controller.createCartItem);

/**
 * @openapi
 * /cartitems/{id}:
 *   put:
 *     summary: Update a cart item
 *     tags: [CartItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put("/:id", controller.updateCartItem);

/**
 * @openapi
 * /cartitems/{id}:
 *   delete:
 *     summary: Delete a cart item
 *     tags: [CartItem]
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
router.delete("/:id", controller.deleteCartItem);

module.exports = router;

