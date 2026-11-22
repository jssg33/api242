// models/plugins/auditDates.js
//
// Adds the audit date fields used by the C# API to every Mongoose schema:
//   InsertDate      DateTime?  set once when the document is created
//   LastUpdateDate  DateTime?  refreshed on every save / update
//   SoftDeleteDate  DateTime?  null until the record is soft-deleted
//
// Registered globally in server.js with mongoose.plugin(auditDates) BEFORE any
// model is required, so it applies to every model without editing each file.
//
// This only adds and maintains the fields. Existing DELETE endpoints still
// hard-delete, and queries do not filter out soft-deleted records.

function auditDates(schema) {
  schema.add({
    InsertDate: { type: Date, default: Date.now },
    LastUpdateDate: { type: Date, default: Date.now },
    SoftDeleteDate: { type: Date, default: null }
  });

  // save() / create(): refresh LastUpdateDate on edits. New documents already
  // got both dates from the defaults above.
  schema.pre("save", function (next) {
    if (!this.isNew) this.LastUpdateDate = new Date();
    next();
  });

  // Query-based updates (findByIdAndUpdate, updateOne, ...) skip save hooks,
  // so stamp LastUpdateDate on the update itself.
  schema.pre(
    ["findOneAndUpdate", "updateOne", "updateMany"],
    function (next) {
      this.set({ LastUpdateDate: new Date() });
      next();
    }
  );
}

module.exports = auditDates;
