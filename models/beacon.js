const mongoose = require('mongoose');

const ArubaBeaconSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  buildingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building',
    required: true
  },

  floor: {
    type: String,
    required: true
  },

  room: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ''
  },

  macAddress: {
    type: String,
    required: true,
    unique: true
  },

  beaconType: {
    type: String,
    enum: ['Aruba', 'iBeacon', 'Eddystone'],
    default: 'Aruba'
  },

  instance: {
    type: String,
    required: false,
    index: true
  },

  region: {
    type: String,
    required: false,
    index: true
  },

  installDate: {
    type: Date,
    default: Date.now
  },

  lastSeen: {
    type: Date
  },

  batteryLevel: {
    type: Number,
    min: 0,
    max: 100
  },

  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance', 'retired'],
    default: 'active'
  }
});

module.exports = mongoose.model('ArubaBeacon', ArubaBeaconSchema);
