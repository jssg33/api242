// models/DatabaseTable.js
// Same fields as the C# Enterprise.Models.DatabaseTable (G4 / G2). Filled by the system console table audit
// (option 7): one row per Mongoose model / MongoDB collection.
const mongoose = require("mongoose");

const databaseTableSchema = new mongoose.Schema(
  {
    tableName: { type: String, required: true, trim: true },
    schemaName: { type: String, trim: true },
    modelName: { type: String, trim: true },
    columnCount: { type: Number, default: 0 },
    createdDate: { type: Date, default: Date.now },
    lastAuditDate: { type: Date },
    isActive: { type: Boolean, default: true },
    schemaArea: { type: String, trim: true },
    userList: { type: String },
    userDenyList: { type: String }
  },
  { collection: "DatabaseTables" }
);

databaseTableSchema.index({ schemaName: 1, tableName: 1 });

module.exports = mongoose.models.DatabaseTable || mongoose.model("DatabaseTable", databaseTableSchema);
