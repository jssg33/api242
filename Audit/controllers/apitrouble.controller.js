// Audit/controllers/apitrouble.controller.js — port of analyticsgen4rev2/Audit/apitrouble.controller.cs
// (WorkerTroubleTicketController). Model lives in apiaudittrouble.js (file-base mismatch inherited from the C#;
// it's also read directly by auditticketsnapshotcontroller.js's capture()).
const WorkerTroubleTicket = require("../models/apiaudittrouble");

// GET / -> GetWorkerTroubleTickets
exports.getAll = async (req, res) => {
  try {
    res.json(await WorkerTroubleTicket.find().sort({ reportedOn: -1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> GetWorkerTroubleTicket
exports.getById = async (req, res) => {
  try {
    const record = await WorkerTroubleTicket.findById(req.params.id);
    if (!record) return res.status(404).end();
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /open -> GetOpenWorkerTroubleTickets
exports.getOpen = async (req, res) => {
  try {
    res.json(await WorkerTroubleTicket.find({ status: "Open" }).sort({ reportedOn: -1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /harddown -> GetHardDownWorkerTroubleTickets
exports.getHardDown = async (req, res) => {
  try {
    res.json(await WorkerTroubleTicket.find({ isHardDown: true }).sort({ reportedOn: -1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> CreateWorkerTroubleTicket
exports.create = async (req, res) => {
  try {
    const input = { ...req.body, reportedOn: new Date() };
    if (!input.status) input.status = "Open";
    if (!input.severity) input.severity = "Critical";
    const ticket = await WorkerTroubleTicket.create(input);
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> UpdateWorkerTroubleTicket
exports.update = async (req, res) => {
  try {
    const existing = await WorkerTroubleTicket.findById(req.params.id);
    if (!existing) return res.status(404).end();

    const fields = [
      "apiName", "endpoint", "environment", "severity", "status", "reportedBy", "description", "assignedTo",
      "resolutionNotes", "resolvedOn", "isHardDown", "incidentCount", "impactedUsers", "businessUnit",
      "rootCause", "evidenceUrl", "auditorNotes", "applicationOwner"
    ];
    for (const f of fields) if (f in req.body) existing[f] = req.body[f];

    await existing.save();
    res.json(existing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id/resolve -> ResolveWorkerTroubleTicket
exports.resolve = async (req, res) => {
  try {
    const ticket = await WorkerTroubleTicket.findById(req.params.id);
    if (!ticket) return res.status(404).end();

    ticket.status = "Resolved";
    ticket.resolvedOn = new Date();
    ticket.resolutionNotes = req.query.resolutionNotes || req.body.resolutionNotes;

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> DeleteWorkerTroubleTicket
exports.remove = async (req, res) => {
  try {
    const record = await WorkerTroubleTicket.findById(req.params.id);
    if (!record) return res.status(404).end();
    await record.deleteOne();
    res.json({ message: "Ticket deleted successfully.", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
