const mongoose = require('mongoose');

const UserLogSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  username: { type: String, required: true },
  hashid: { type: Number, required: true },
  hashedpassword: { type: String, required: true },
  loginstatus: { type: String, required: true },
  description: { type: String },
  uiorigin: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('UserLog', UserLogSchema);
