// routes/specialPricingRoutes.js

const express = require('express');
const router = express.Router();
const SpecialPricingController = require('../controllers/SpecialPricingController');

/**
 * @swagger
 * tags:
 *   name: SpecialPricing
 *   description: Special pricing request endpoints
 */

/**
 * @swagger
 * /api/specialpricing:
 *   get:
 *     summary: Get all special pricing requests
 *     tags: [SpecialPricing]
 */
router.get('/', SpecialPricingController.getAll);

/**
 * @swagger
 * /api/specialpricing/{id}:
 *   get:
 *     summary: Get special pricing request by ID
 *     tags: [SpecialPricing]
 */
router.get('/:id', SpecialPricingController.getOne);

/**
 * @swagger
 * /api/specialpricing/user/{userId}:
 *   get:
 *     summary: Get special pricing requests by userId
 *     tags: [SpecialPricing]
 */
router.get('/user/:userId', SpecialPricingController.getByUser);

/**
 * @swagger
 * /api/specialpricing/region/{region}:
 *   get:
 *     summary: Get special pricing requests by region
 *     tags: [SpecialPricing]
 */
router.get('/region/:region', SpecialPricingController.getByRegion);

/**
 * @swagger
 * /api/specialpricing:
 *   post:
 *     summary: Create a new special pricing request
 *     tags: [SpecialPricing]
 */
router.post('/', SpecialPricingController.create);

/**
 * @swagger
 * /api/specialpricing/{id}:
 *   put:
 *     summary: Update a special pricing request
 *     tags: [SpecialPricing]
 */
router.put('/:id', SpecialPricingController.update);

/**
 * @swagger
 * /api/specialpricing/{id}:
 *   delete:
 *     summary: Delete a special pricing request
 *     tags: [SpecialPricing]
 */
router.delete('/:id', SpecialPricingController.remove);

module.exports = router;
