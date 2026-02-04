const mongoose = require('mongoose');

const UserNoticeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  noticeDatetime: {
    type: Date,
    required: true
  },
  noticetype: {
    type: String,
    required: true
  },
  emailgwtype: {
    type: String,
    required: true
  },
  userid: {
    type: Number,
    required: true
  },
  useridstring: {
    type: String,
    required: true
  },
  emailaddress: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('UserNotice', UserNoticeSchema);
