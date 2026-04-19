const mongoose = require('mongoose');

const UserNoticeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  noticeDatetime: {
    type: Date,
    required: false
  },
  noticetype: {
    type: String,
    required: false
  },
  emailgwtype: {
    type: String,
    required: false
  },
   mongoid: {
    type: String,
    required: true
  },
    isDeleted: {
    type: Boolean,
    required: false,
      default: false
  },
  username: {
    type: String,
    required: true
  },
  userid: {
    type: Number,
    required: false
  },
  useridstring: {
    type: String,
    required: false
  },
  emailaddress: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('UserNotice', UserNoticeSchema);
