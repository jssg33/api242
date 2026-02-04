const Reservation = require("../models/reservationModel");

// -------------------------------------------------
// GET /reservations
// -------------------------------------------------
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};

// -------------------------------------------------
// POST /reservations
// -------------------------------------------------
exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    const saved = await reservation.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating reservation", error });
  }
};

// -------------------------------------------------
// GET /reservations/:id
// -------------------------------------------------
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservation", error });
  }
};

// -------------------------------------------------
// PUT /reservations/:id
// -------------------------------------------------
exports.updateReservation = async (req, res) => {
  try {
    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating reservation", error });
  }
};

// -------------------------------------------------
// DELETE /reservations/:id
// -------------------------------------------------
exports.deleteReservation = async (req, res) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json({ message: "Reservation deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reservation", error });
  }
};

// -------------------------------------------------
// GET /reservations/booking/:bookingId
// -------------------------------------------------
exports.getReservationsByBooking = async (req, res) => {
  try {
    const reservations = await Reservation.find({ bookingId: req.params.bookingId });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking reservations", error });
  }
};

// -------------------------------------------------
// GET /reservations/user/:userid
// -------------------------------------------------
exports.getReservationsByUser = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userid: req.params.userid });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user reservations", error });
  }
};
