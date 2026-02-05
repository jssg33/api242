const mongoose = require('mongoose');

const AdminLogSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  userid: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  acknowledged: { type: String },
  techid: { type: Number },
  managerescid: { type: Number },
  threatlevel: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('AdminLog', AdminLogSchema);
