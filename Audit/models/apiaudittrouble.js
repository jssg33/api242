// Audit/models/apiaudittrouble.js
// Port of analyticsgen4rev2/Audit/apiaudittrouble.cs (Enterprise.Models.WorkerTroubleTicket). The C# file has no
// ".model" suffix in its own name, so neither does this one — kept consistent with the "same file name base" rule.
// Surfaced by Audit/controllers/apitrouble.controller.js ("/api/WorkerTroubleTickets") and read by
// Audit/controllers/auditticketsnapshot.controller.js's capture() for the "Surveillance" ticket queue.
const mongoose = require("mongoose");

const workerTroubleTicketSchema = new mongoose.Schema(
  {
    ticketNumber: { type: String, trim: true, maxlength: 100, default: () => require("crypto").randomUUID() },
    apiName: { type: String, trim: true, maxlength: 200, default: "" },
    endpoint: { type: String, trim: true, maxlength: 500, default: "" },
    environment: { type: String, trim: true, maxlength: 50, default: "Production" },
    severity: { type: String, trim: true, maxlength: 50, default: "Critical" },
    status: { type: String, trim: true, maxlength: 50, default: "Open" },
    reportedBy: { type: String, trim: true, maxlength: 200, default: "" },
    reportedOn: { type: Date, default: Date.now },
    resolvedOn: { type: Date },
    description: { type: String, trim: true, maxlength: 4000, default: "" },
    resolutionNotes: { type: String, trim: true, maxlength: 4000, default: "" },
    assignedTo: { type: String, trim: true, maxlength: 50, default: "" },
    isHardDown: { type: Boolean, default: false },
    incidentCount: { type: Number, default: 1 },
    impactedUsers: { type: Number },
    businessUnit: { type: String, trim: true, maxlength: 100 },
    rootCause: { type: String, trim: true, maxlength: 2000 },
    evidenceUrl: { type: String, trim: true, maxlength: 1000 },
    auditorNotes: { type: String, trim: true, maxlength: 4000 },
    applicationOwner: { type: String, trim: true, maxlength: 200 }
  },
  { collection: "WorkerTroubleTickets" }
);

module.exports = mongoose.models.WorkerTroubleTicket || mongoose.model("WorkerTroubleTicket", workerTroubleTicketSchema);
