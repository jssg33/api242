const Payment = require("../models/paymentModel");

// -------------------------------------------------
// GET /payments → Get all payments
// -------------------------------------------------
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error });
  }
};

// -------------------------------------------------
// POST /payments → Create a new payment
// -------------------------------------------------
exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const saved = await payment.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating payment", error });
  }
};

// -------------------------------------------------
// GET /payments/:id → Get payment by Mongo _id
// -------------------------------------------------
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment", error });
  }
};

// -------------------------------------------------
// PUT /payments/:id → Update payment
// -------------------------------------------------
exports.updatePayment = async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating payment", error });
  }
};

// -------------------------------------------------
// DELETE /payments/:id → Delete payment
// -------------------------------------------------
exports.deletePayment = async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ message: "Payment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting payment", error });
  }
};

// -------------------------------------------------
// GET /payments/user/:userid → Payments for a user
// -------------------------------------------------
exports.getPaymentsByUser = async (req, res) => {
  try {
    const payments = await Payment.find({ userid: req.params.userid });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user payments", error });
  }
};

// -------------------------------------------------
// GET /payments/booking/:bookingId → Payments for a booking
// -------------------------------------------------
exports.getPaymentsByBooking = async (req, res) => {
  try {
    const payments = await Payment.find({ bookingId: req.params.bookingId });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking payments", error });
  }
};

// -------------------------------------------------
// GET /payments/transaction/:transactionId
// -------------------------------------------------
exports.getPaymentsByTransaction = async (req, res) => {
  try {
    const payments = await Payment.find({ transactionId: req.params.transactionId });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transaction payments", error });
  }
};
