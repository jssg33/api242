// File: routes/userFriendRequestsRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/userFriendRequestsController');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserFriendRequests:
 *       type: object
 *       required:
 *         - _id
 *         - requesterId
 *         - targetId
 *       properties:
 *         _id:
 *           type: string
 *         requesterId:
 *           type: string
 *         requesterName:
 *           type: string
 *         targetId:
 *           type: string
 *         targetName:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, accepted, rejected]
 */

/**
 * @swagger
 * /api/userfriendrequests:
 *   post:
 *     summary: Create a new friend request
 *     tags: [UserFriendRequests]
 */
router.post('/', controller.createRequest);

/**
 * @swagger
 * /api/userfriendrequests/incoming/{userId}:
 *   get:
 *     summary: Get all incoming friend requests for a user
 *     tags: [UserFriendRequests]
 */
router.get('/incoming/:userId', controller.getRequestsForUser);

/**
 * @swagger
 * /api/userfriendrequests/outgoing/{userId}:
 *   get:
 *     summary: Get all outgoing friend requests sent by a user
 *     tags: [UserFriendRequests]
 */
router.get('/outgoing/:userId', controller.getRequestsByUser);

/**
 * @swagger
 * /api/userfriendrequests/{id}:
 *   get:
 *     summary: Get a single friend request by _id
 *     tags: [UserFriendRequests]
 */
router.get('/:id', controller.getRequestById);

/**
 * @swagger
 * /api/userfriendrequests/{id}/approve:
 *   post:
 *     summary: Approve a friend request
 *     tags: [UserFriendRequests]
 */
router.post('/:id/approve', controller.approveRequest);

/**
 * @swagger
 * /api/userfriendrequests/{id}/reject:
 *   post:
 *     summary: Reject a friend request
 *     tags: [UserFriendRequests]
 */
router.post('/:id/reject', controller.rejectRequest);

/**
 * @swagger
 * /api/userfriendrequests/{id}:
 *   delete:
 *     summary: Delete a friend request
 *     tags: [UserFriendRequests]
 */
router.delete('/:id', controller.deleteRequest);

module.exports = router;
