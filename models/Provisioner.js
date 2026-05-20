// models/Provisioner.js
const mongoose = require('mongoose');

const ProvisionerSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  firstname: { type: String },

  address1: { type: String },
  address2: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },

  phone: { type: String },
  cell: { type: String },
  btn: { type: String },

  managerid: { type: mongoose.Schema.Types.ObjectId, ref: 'ProvisioningManager' },

  region: { type: String },
  bu: { type: String },
  specialitytype: { type: String },

  hiredate: { type: Date },

  status: {
    type: String,
    enum: ['active', 'suspended', 'terminated', 'leave'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Provisioner', ProvisionerSchema);
