// Audit/models/AuditScheduleEndpoints-110.model.js
// Port of the AuditSchedule entity referenced by analyticsgen4rev2/Audit/AuditScheduleEndpoints-110.cs. Its own
// model file ("Models-and-context-110.cs") isn't in this Audit folder, so fields are inferred from the
// controller's own field-by-field usage (Normalize/Problem/Claim/Complete and the PUT's `H(...)` list).
const mongoose = require("mongoose");

const auditScheduleSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    apiHostId: { type: Number, required: true },
    endpointGroup: { type: String, required: true, trim: true }, // the controller name, e.g. "Users"

    recurrence: { type: String, trim: true, default: "once" }, // once | hourly | daily | weekly | monthly
    intervalCount: { type: Number, default: 1 },
    startAt: { type: Date, required: true },
    nextRunAt: { type: Date },

    enabled: { type: Boolean, default: true },
    runner: { type: String, trim: true, default: "any" }, // any | browser | server

    authCheck: { type: Boolean, default: true },
    probeWrites: { type: Boolean, default: false },
    stampEndpoints: { type: Boolean, default: true },

    auditorName: { type: String, trim: true },
    auditorId: { type: Number },
    notes: { type: String },

    status: { type: String, trim: true, default: "Scheduled" }, // Scheduled | Paused | Running | Done | Failed
    claimedBy: { type: String, trim: true, maxlength: 200 },
    claimedAt: { type: Date },

    lastRunAt: { type: Date },
    lastResultId: { type: Number },
    lastOutcome: { type: String, maxlength: 1000 },
    runCount: { type: Number, default: 0 },

    instanceId: { type: String, trim: true },
    shardId: { type: String, trim: true },

    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date }
  },
  { collection: "AuditSchedules" }
);

module.exports = mongoose.models.AuditSchedule || mongoose.model("AuditSchedule", auditScheduleSchema);
