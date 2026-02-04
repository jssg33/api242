const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - bookingId
 *         - uid
 *         - billingTelephoneNumber
 *         - creditCardType
 *         - creditCardLast4
 *         - creditCardExpDate
 *         - quantityAdults
 *         - quantityChildren
 *         - customerBillingName
 *         - totalAmount
 *         - transactionId
 *         - parkId
 *         - parkName
 *         - cartid
 *         - reservationtype
 *         - reservationstatus
 *         - resStart
 *         - resEnd
 *         - userid
 *       properties:
 *         bookingId:
 *           type: number
 *         uid:
 *           type: string
 *         billingTelephoneNumber:
 *           type: string
 *         creditCardType:
 *           type: string
 *         creditCardLast4:
 *           type: string
 *         creditCardExpDate:
 *           type: string
 *         quantityAdults:
 *           type: number
 *         quantityChildren:
 *           type: number
 *         customerBillingName:
 *           type: string
 *         totalAmount:
 *           type: number
 *         transactionId:
 *           type: string
 *         parkId:
 *           type: number
 *         parkName:
 *           type: string
 *         cartid:
 *           type: string
 *         reservationtype:
 *           type: string
 *         reservationstatus:
 *           type: string
 *         reversetransactionid:
 *           type: string
 *         cancellationrefund:
 *           type: number
 *         cartDetailsJson:
 *           type: string
 *         totalcartitems:
 *           type: number
 *         reference:
 *           type: string
 *         subReference:
 *           type: string
 *         adults:
 *           type: number
 *         children:
 *           type: number
 *         resStart:
 *           type: string
 *           format: date-time
 *         resEnd:
 *           type: string
 *           format: date-time
 *         tentsites:
 *           type: number
 *         parkGuid:
 *           type: string
 *         numDays:
 *           type: number
 *         possource:
 *           type: string
 *         userid:
 *           type: number
 *         emailnoticeaddress:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     tags: [Reservations]
 *     summary: Get all reservations
 *     responses:
 *       200:
 *         description: List of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Reservation"
 */
router.get("/", reservationController.getReservations);

/**
 * @swagger
 * /reservations:
 *   post:
 *     tags: [Reservations]
 *     summary: Create a new reservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Reservation"
 *     responses:
 *       201:
 *         description: Reservation created
 */
router.post("/", reservationController.createReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     tags: [Reservations]
 *     summary: Get a reservation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation found
 *       404:
 *         description: Reservation not found
 */
router.get("/:id", reservationController.getReservationById);

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     tags: [Reservations]
 *     summary: Update a reservation
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
 *             $ref: "#/components/schemas/Reservation"
 *     responses:
 *       200:
 *         description: Reservation updated
 *       404:
 *         description: Reservation not found
 */
router.put("/:id", reservationController.updateReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     tags: [Reservations]
 *     summary: Delete a reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation deleted
 *       404:
 *         description: Reservation not found
 */
router.delete("/:id", reservationController.deleteReservation);

/**
 * @swagger
 * /reservations/booking/{bookingId}:
 *   get:
 *     tags: [Reservations]
 *     summary: Get reservations by booking ID
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Reservations for the booking
 */
router.get("/booking/:bookingId", reservationController.getReservationsByBooking);

/**
 * @swagger
 * /reservations/user/{userid}:
 *   get:
 *     tags: [Reservations]
 *     summary: Get reservations by user ID
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Reservations for the user
 */
router.get("/user/:userid", reservationController.getReservationsByUser);

module.exports = router;
