const mongoose = require('mongoose');

const UserLogSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  username: { type: String, required: true },
  hashid: { type: Number, required: false },
  mongoid: { type: String, required: false },
  location: { type: String, required: false },
  loginstatus: { type: String, required: false },
  ipaddress: { type: String, required: false },
  description: { type: String, required: true },
  uiorigin: { type: String, required: false },
  instance: { type: String, required: false },
  region: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('UserLog', UserLogSchema);
