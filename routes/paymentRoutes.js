const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Core CRUD
router.get("/", paymentController.getPayments);
router.post("/", paymentController.createPayment);
router.get("/:id", paymentController.getPaymentById);
router.put("/:id", paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);

// Optional: Get all payments for a specific user
router.get("/user/:userid", paymentController.getPaymentsByUser);

// Optional: Get payments by bookingId
router.get("/booking/:bookingId", paymentController.getPaymentsByBooking);

// Optional: Get payments by transactionId
router.get("/transaction/:transactionId", paymentController.getPaymentsByTransaction);

module.exports = router;
