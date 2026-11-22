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

// Mongoose also applies defaults when it loads an old document that is
// missing the field. A plain Date.now default would make every existing
// record look like it was inserted "now", so only stamp brand-new documents.
function newDocumentDate() {
  return this && this.isNew ? new Date() : undefined;
}

function auditDates(schema) {
  schema.add({
    InsertDate: { type: Date, default: newDocumentDate },
    LastUpdateDate: { type: Date, default: newDocumentDate },
    SoftDeleteDate: { type: Date, default: null }
  });

  // isDeleted (0/1) says WHETHER a record is soft-deleted; SoftDeleteDate says
  // WHEN. On models that have isDeleted, keep the two in step: flipping it to
  // 1 stamps the date (unless the caller supplied one), flipping it to 0
  // clears it.
  const hasIsDeleted = !!schema.path("isDeleted");
  const softDeleteDateFor = (isDeleted, suppliedDate, now) =>
    Number(isDeleted) === 1 ? suppliedDate || now : null;

  // save() / create(): refresh LastUpdateDate on edits. New documents already
  // got both dates from the defaults above.
  schema.pre("save", function (next) {
    const now = new Date();
    if (!this.isNew) this.LastUpdateDate = now;
    if (hasIsDeleted && this.isModified("isDeleted")) {
      const supplied = this.isModified("SoftDeleteDate") ? this.SoftDeleteDate : null;
      this.SoftDeleteDate = softDeleteDateFor(this.isDeleted, supplied, now);
    }
    next();
  });

  // Query-based updates (findByIdAndUpdate, updateOne, ...) skip save hooks,
  // so stamp the update itself.
  schema.pre(
    ["findOneAndUpdate", "updateOne", "updateMany"],
    function (next) {
      const now = new Date();
      this.set({ LastUpdateDate: now });

      if (hasIsDeleted) {
        const u = this.getUpdate() || {};
        const $set = u.$set || {};
        const isDeleted = "isDeleted" in $set ? $set.isDeleted : u.isDeleted;
        if (isDeleted !== undefined) {
          const supplied = $set.SoftDeleteDate || u.SoftDeleteDate;
          this.set({ SoftDeleteDate: softDeleteDateFor(isDeleted, supplied, now) });
        }
      }

      // Upserts that create a document also need an InsertDate, unless the
      // caller supplied one (setting it twice would be a Mongo conflict).
      if (this.getOptions().upsert) {
        const update = this.getUpdate() || {};
        const callerSetIt =
          "InsertDate" in update || (update.$set && "InsertDate" in update.$set);
        if (!callerSetIt) {
          update.$setOnInsert = Object.assign({ InsertDate: now }, update.$setOnInsert);
          this.setUpdate(update);
        }
      }
      next();
    }
  );
}

module.exports = auditDates;
