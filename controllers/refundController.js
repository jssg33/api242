const Refund = require("../models/refundModel");

// -------------------------------------------------
// GET /refunds → Get all refunds
// -------------------------------------------------
exports.getRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find();
    res.status(200).json(refunds);
  } catch (error) {
    res.status(500).json({ message: "Error fetching refunds", error });
  }
};

// -------------------------------------------------
// POST /refunds → Create refund
// -------------------------------------------------
exports.createRefund = async (req, res) => {
  try {
    const refund = new Refund(req.body);
    const saved = await refund.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating refund", error });
  }
};

// -------------------------------------------------
// GET /refunds/:id → Get refund by ID
// -------------------------------------------------
exports.getRefundById = async (req, res) => {
  try {
    const refund = await Refund.findById(req.params.id);

    if (!refund) {
      return res.status(404).json({ message: "Refund not found" });
    }

    res.status(200).json(refund);
  } catch (error) {
    res.status(500).json({ message: "Error fetching refund", error });
  }
};

// -------------------------------------------------
// PUT /refunds/:id → Update refund
// -------------------------------------------------
exports.updateRefund = async (req, res) => {
  try {
    const updated = await Refund.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Refund not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating refund", error });
  }
};

// -------------------------------------------------
// DELETE /refunds/:id → Delete refund
// -------------------------------------------------
exports.deleteRefund = async (req, res) => {
  try {
    const deleted = await Refund.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Refund not found" });
    }

    res.status(200).json({ message: "Refund deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting refund", error });
  }
};

// -------------------------------------------------
// GET /refunds/booking/:bookingId
// -------------------------------------------------
exports.getRefundsByBooking = async (req, res) => {
  try {
    const refunds = await Refund.find({ bookingId: req.params.bookingId });
    res.status(200).json(refunds);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking refunds", error });
  }
};

// -------------------------------------------------
// GET /refunds/transaction/:transactionId
// -------------------------------------------------
exports.getRefundsByTransaction = async (req, res) => {
  try {
    const refunds = await Refund.find({ transactionId: req.params.transactionId });
    res.status(200).json(refunds);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transaction refunds", error });
  }
};
