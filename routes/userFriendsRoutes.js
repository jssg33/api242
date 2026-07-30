// File: routes/userFriendsRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/userFriendsController');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserFriends:
 *       type: object
 *       required:
 *         - _id
 *         - userId
 *         - friendId
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         friendId:
 *           type: string
 *         friendName:
 *           type: string
 *         canSeeLocation:
 *           type: boolean
 */

/**
 * @swagger
 * /api/userfriends:
 *   post:
 *     summary: Add a new friend (approved friendship)
 *     tags: [UserFriends]
 */
router.post('/', controller.addFriend);

/**
 * @swagger
 * /api/userfriends/user/{userId}:
 *   get:
 *     summary: Get all friends for a user
 *     tags: [UserFriends]
 */
router.get('/user/:userId', controller.getFriendsByUser);

/**
 * @swagger
 * /api/userfriends/{id}:
 *   get:
 *     summary: Get a single friend record by _id
 *     tags: [UserFriends]
 */
router.get('/:id', controller.getFriendById);

/**
 * @swagger
 * /api/userfriends/{id}:
 *   delete:
 *     summary: Delete a friend record by _id
 *     tags: [UserFriends]
 */
router.delete('/:id', controller.deleteFriend);

/**
 * @swagger
 * /api/userfriends/user/{userId}:
 *   delete:
 *     summary: Delete all friends for a user
 *     tags: [UserFriends]
 */
router.delete('/user/:userId', controller.deleteFriendsByUser);

module.exports = router;
