const mongoose = require('mongoose');

const BuildingHistorySchema = new mongoose.Schema({
    buildingId: { 
        type: Number, 
        required: true 
    },
    buildingName: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Number, // Stores Unix timestamp as Long
        required: true 
    },
    latitude: { 
        type: Number, 
        default: 0.0 
    },
    longitude: { 
        type: Number, 
        default: 0.0 
    },
    syncDate: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('BuildingHistory', BuildingHistorySchema);
