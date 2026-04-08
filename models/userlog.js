const mongoose = require('mongoose');

const UserLogSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  username: { type: String, required: true },
  hashid: { type: Number, required: true },
  location: { type: String, required: false },
  loginstatus: { type: String, required: true },
  ipaddress: { type: String, required: false },
  description: { type: String },
  uiorigin: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('UserLog', UserLogSchema);
