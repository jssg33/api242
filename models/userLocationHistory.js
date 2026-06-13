const mongoose = require('mongoose');

const userLocationSchema = new mongoose.Schema({
    _id: { type: String, required: false},
    campusId: { type: Number, required: false },
    buildingId: { type: Number, required: false },
    buildingName: { type: String, required: false },
    userId: { type: String, required: true },
    userName: { type: String, required: false },
    timestamp: { type: String, required: false }, 
    latitude: { type: Number, default: 0.0, required: true },
    longitude: { type: Number, default: 0.0, required: true },
    });

module.exports = mongoose.model('userLocationHistory', userLocationSchema);

