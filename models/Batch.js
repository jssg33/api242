const mongoose = require('mongoose');

const BatchSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  batchname: { type: String, required: true },
  filelocationpath: { type: String },
  batchtype: { type: Number },
  batchstatus: { type: Number },
  batchstart: { type: Date },
  batchend: { type: Date },
  qtystart: { type: Number },
  qtyend: { type: Number },
  qtyexpected: { type: Number },
  qtyactual: { type: Number },
  qtyerror: { type: Number },
  qty: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Batch', BatchSchema);
