// models/DatabaseField.js
// Same fields as the C# Enterprise.Models.DatabaseField (G4 / G2). Filled by the system console field audit
// (option 6): one row per Mongoose schema path.
const mongoose = require("mongoose");

const databaseFieldSchema = new mongoose.Schema(
  {
    databaseTableId: { type: mongoose.Schema.Types.ObjectId, ref: "DatabaseTable" },
    tableName: { type: String, required: true, trim: true },
    schemaName: { type: String, trim: true },
    fieldName: { type: String, required: true, trim: true },
    dataType: { type: String, trim: true },
    clrType: { type: String, trim: true },
    isNullable: { type: Boolean, default: true },
    maxLength: { type: Number },
    isPrimaryKey: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
    lastAuditDate: { type: Date },
    isActive: { type: Boolean, default: true },
    userList: { type: String },
    userDenyList: { type: String }
  },
  { collection: "DatabaseFields" }
);

databaseFieldSchema.index({ schemaName: 1, tableName: 1, fieldName: 1 });

module.exports = mongoose.models.DatabaseField || mongoose.model("DatabaseField", databaseFieldSchema);
