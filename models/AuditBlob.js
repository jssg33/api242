// models/AuditBlob.js
// Same fields as the C# Enterprise.Models.AuditBlob (G4 / G2), camelCase like the other C#-parity models.
// Holds audit reports and schema dumps written by the system console (routes/SystemConsoleRoutes.js).
const mongoose = require("mongoose");

const auditBlobSchema = new mongoose.Schema(
  {
    blobType: { type: String, trim: true, default: "SQLSECURITY", maxlength: 90 },
    fileName: { type: String, trim: true, maxlength: 500, index: true },
    filePath: { type: String, trim: true, maxlength: 2000 },
    auditType: { type: String, trim: true, maxlength: 100, index: true },
    blobText: { type: String },
    blobSize: { type: Number, default: 0 },
    createdDate: { type: Date, default: Date.now },
    importedDate: { type: Date, default: Date.now },
    processed: { type: Boolean, default: false }
  },
  { collection: "AuditBlob" }
);

module.exports = mongoose.models.AuditBlob || mongoose.model("AuditBlob", auditBlobSchema);
