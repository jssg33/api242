const mongoose = require('mongoose');

const AdminLogSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  userid: { type: String, required: false },
  date: { type: Date, required: false },
  description: { type: String, required: true },
  mongoid: { type: String, required: true },
  acknowledged: { type: String },
  techid: { type: Number },
  managerescid: { type: Number },
  threatlevel: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('AdminLog', AdminLogSchema);
