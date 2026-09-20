const mongoose = require("mongoose");
 
/**
 * Case (Mongoose / MongoDB)
 *
 * General-purpose investigative case record — criminal cases today,
 * but usable for other investigation types too.
 *
 * Companion table to the `User` collection. The `userid`/`managerid`/
 * `srmanagerid` fields here are strings that match `User.useridstring`
 * (the SSO-backed identifier), not the legacy numeric `User.userid`.
 */
const caseSchema = new mongoose.Schema(
  {
    // -------------------------------------------------
    // Case Identity
    // -------------------------------------------------
    casenumber: {
      type: String,
      required: true,
      trim: true,
      unique: true, // official case/report number (agency's RMS number)
    },
    casetype: {
      type: String,
      trim: true,
      default: "criminal", // e.g. criminal, internal_affairs, civil, background_check
    },
 
    // -------------------------------------------------
    // People (SSO string ids — match User.useridstring)
    // -------------------------------------------------
    userid: {
      type: String,
      required: true,
      trim: true,
      index: true, // investigator/officer who created or owns the case
    },
    managerid: {
      type: String,
      trim: true,
      index: true, // approving officer
    },
    srmanagerid: {
      type: String,
      trim: true,
      index: true, // senior manager in the approval chain
    },
 
    // -------------------------------------------------
    // Company / Agency
    // -------------------------------------------------
    companyid: {
      type: String,
      required: true,
      trim: true,
      index: true, // the owning PD/agency, matches User.companyid
    },
 
    // -------------------------------------------------
    // Case Details
    // -------------------------------------------------
    status: {
      type: String,
      enum: ["open", "under_investigation", "closed", "referred_to_da"],
      default: "open",
    },
    offensetype: { type: String, trim: true }, // e.g. NIBRS/UCR code
    incidentdate: Date,
    reportdate: Date,
    location: { type: String, trim: true }, // free-text address/jurisdiction
 
    // -------------------------------------------------
    // Geolocation
    // -------------------------------------------------
    latitude: {
      type: Number,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      min: -180,
      max: 180,
    },
 
    // -------------------------------------------------
    // Approval Workflow
    // -------------------------------------------------
    approvalstatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvedat: Date,
    srapprovedat: Date,
  },
  { timestamps: true }
);
 
// Compound index for the common "cases for this PD, filtered by status" query
caseSchema.index({ companyid: 1, status: 1 });
 
// Compound index for lat/long lookups (plain Number pair, not GeoJSON;
// switch to a GeoJSON Point + "2dsphere" index if you need $near/$geoWithin)
caseSchema.index({ latitude: 1, longitude: 1 });
 
module.exports = mongoose.model("Case", caseSchema);
