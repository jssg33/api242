// Audit/models/auditticketsnapshot.model.js
// Port of analyticsgen4rev2/Audit/auditticketsnapshot.model.cs (Enterprise.Models.AuditTicketSnapshot): the
// ticket queue at the moment an audit run is saved. Written by the capture() helper in
// Audit/controllers/auditticketsnapshot.controller.js.
const mongoose = require("mongoose");

const auditTicketSnapshotSchema = new mongoose.Schema(
  {
    auditResultId: { type: Number },
    snapshotDate: { type: Date, required: true },
    ticketSource: { type: String, trim: true, maxlength: 20, default: "Surveillance" },
    apiName: { type: String, trim: true, maxlength: 255, default: "(all)" },
    openCount: { type: Number, default: 0 },
    inProgressCount: { type: Number, default: 0 },
    hardDownCount: { type: Number, default: 0 },
    inQueueCount: { type: Number, default: 0 }
  },
  { collection: "AuditTicketSnapshot" }
);

module.exports = mongoose.models.AuditTicketSnapshot || mongoose.model("AuditTicketSnapshot", auditTicketSnapshotSchema);
