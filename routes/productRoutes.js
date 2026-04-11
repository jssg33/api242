const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - SKEWID
 *         - qtyonhand
 *         - listprice
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId

         SKEWID:
           type: string
           description: Unique product identifier

         qtyonhand:
           type: number

         listprice:
           type: number

         vpdiscount:
           type: number

         dirdiscount:
           type: number

         managerdiscount:
           type: number

         description:
           type: string

         latitude:
           type: number

         longitude:
           type: number

         trailmapurl:
           type: string

         parklogourl:
           type: string

         pic1url:
           type: string
         pic2url:
           type: string
         pic3url:
           type: string
         pic4url:
           type: string
         pic5url:
           type: string
         pic6url:
           type: string
         pic7url:
           type: string
         pic8url:
           type: string
         pic9url:
           type: string

         vendorid:
           type: string

         vendorname:
           type: string

         warehouseid:
           type: string
           default: "001"

         createdAt:
           type: string
           format: date-time

         updatedAt:
           type: string
           format: date-time

       example:
         SKEWID: "ABC123"
         qtyonhand: 50
         listprice: 199.99
         vpdiscount: 10
         dirdiscount: 5
         managerdiscount: 15
         description: "High-quality widget"

         latitude: 34.12345
         longitude: -81.23456
         trailmapurl: "https://example.com/trailmap.jpg"
         parklogourl: "https://example.com/logo.jpg"

         pic1url: "https://example.com/pic1.jpg"
         pic2url: "https://example.com/pic2.jpg"
         pic3url: "https://example.com/pic3.jpg"
         pic4url: "https://example.com/pic4.jpg"
         pic5url: "https://example.com/pic5.jpg"
         pic6url: "https://example.com/pic6.jpg"
         pic7url: "https://example.com/pic7.jpg"
         pic8url: "https://example.com/pic8.jpg"
         pic9url: "https://example.com/pic9.jpg"

         vendorid: "VEND001"
         vendorname: "WidgetCo"
         warehouseid: "001"
 */

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", productController.getAllProducts);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get("/:id", productController.getProductById);

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - SKEWID
 *               - qtyonhand
 *               - listprice
 *             properties:
 *               SKEWID:
 *                 type: string
 *               qtyonhand:
 *                 type: number
 *               listprice:
 *                 type: number
 *               vpdiscount:
 *                 type: number
 *               dirdiscount:
 *                 type: number
 *               managerdiscount:
 *                 type: number
 *               description:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               trailmapurl:
 *                 type: string
 *               parklogourl:
 *                 type: string
 *               pic1url:
 *                 type: string
 *               pic2url:
 *                 type: string
 *               pic3url:
 *                 type: string
 *               pic4url:
 *                 type: string
 *               pic5url:
 *                 type: string
 *               pic6url:
 *                 type: string
 *               pic7url:
 *                 type: string
 *               pic8url:
 *                 type: string
 *               pic9url:
 *                 type: string
 *               vendorid:
 *                 type: string
 *               vendorname:
 *                 type: string
 *               warehouseid:
 *                 type: string
 *                 default: "001"
 *     responses:
 *       201:
 *         description: Product created
 */
router.post("/", productController.createProduct);


/**
 * @openapi
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags:
 *       - Products
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
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
router.put("/:id", productController.updateProduct);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete("/:id", productController.deleteProduct);

module.exports = router;

