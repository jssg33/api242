const mongoose = require('mongoose');

const ApiLogSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  apiname: { type: String, required: true },
  apinumber: { type: String, required: true },
  eptype: { type: String, required: true },
  hashid: { type: Number, required: true },
  parameterlist: { type: String },
  apiresult: { type: String },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ApiLog', ApiLogSchema);
