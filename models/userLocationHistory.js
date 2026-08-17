const mongoose = require('mongoose');

const userLocationSchema = new mongoose.Schema({
    _id: { type: String, required: true},
    campusId: { type: Number, required: false },
    buildingId: { type: Number, required: false },
    buildingName: { type: String, required: false },
    userId: { type: String, required: true },
    userName: { type: String, required: false },
    userStatus: { type: String, required: false } || "available",
    timestamp: { type: String, required: false },
    deviceserialnumber: { type: String, required: false },
    deviceIMEI1: { type: String, required: false },
    deviceIMEI2: { type: String, required: false },
    devicemodel: { type: String, required: false },
    deviceosversion: { type: String, required: false },
    devicetype: { type: String, required: false },
    devicecarrier: { type: String, required: false },
    deviceCLLP: { type: String, required: false },
    instance: { type: String, required: false },
    region: { type: String, required: false },
    collectorid: { type: String, required: false },
    latitude: { type: Number, default: 0.0, required: true },
    longitude: { type: Number, default: 0.0, required: true },
    });

module.exports = mongoose.model('userLocationHistory', userLocationSchema);

