const mongoose = require('mongoose');

const BuildingHistorySchema = new mongoose.Schema({
    buildingId: { 
        type: Number, 
        required: false 
    },
    buildingName: { 
        type: String, 
        required: false 
    },
    userId: { 
        type: String, 
        required: true 
    },
    userName: { 
        type: String, 
        required: false 
    },
    timestamp: { 
        type: Number, // Stores Unix timestamp as Long
        required: false 
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
