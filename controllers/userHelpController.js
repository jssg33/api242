const UserHelp = require("../models/userhelp");

// CREATE
exports.createTicket = async (req, res) => {
  try {
    const ticket = await UserHelp.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL
exports.getTickets = async (req, res) => {
  try {
    const tickets = await UserHelp.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await UserHelp.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await UserHelp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await UserHelp.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json({ message: "Ticket deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
