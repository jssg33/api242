const express = require('express');
const router = express.Router();
const controller = require('../controllers/testimonialsController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Testimonial:
 *       type: object
 *       required:
 *         - authorName
 *         - productName
 *         - productId
 *         - description
 *         - month
 *         - year
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         authorName:
 *           type: string
 *         productName:
 *           type: string
 *         productId:
 *           type: string
 *         description:
 *           type: string
 *         month:
 *           type: number
 *         year:
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
 * /api/testimonials:
 *   get:
 *     summary: Get all testimonials
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: List of testimonials
 *   post:
 *     summary: Create a new testimonial
 *     tags: [Testimonials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Testimonial'
 *     responses:
 *       201:
 *         description: Testimonial created
 */

/**
 * @swagger
 * /api/testimonials/{id}:
 *   get:
 *     summary: Get a testimonial by ID
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial found
 *       404:
 *         description: Not found
 *
 *   put:
 *     summary: Update a testimonial
 *     tags: [Testimonials]
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
 *             $ref: '#/components/schemas/Testimonial'
 *     responses:
 *       200:
 *         description: Updated testimonial
 *       404:
 *         description: Not found
 *
 *   delete:
 *     summary: Delete a testimonial
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */

router.get('/', controller.getTestimonials);
router.post('/', controller.createTestimonial);
router.get('/:id', controller.getTestimonialById);
router.put('/:id', controller.updateTestimonial);
router.delete('/:id', controller.deleteTestimonial);

module.exports = router;
