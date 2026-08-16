const mongoose = require('mongoose');

const MusicHistorySchema = new mongoose.Schema({
    // Link to the user (Mongo ID)
    userid: { 
        type: String, 
        required: true, 
        index: true 
    },
    // The specific song instance ID from the catalog
    instanceid: { 
        type: String, 
        required: true 
    },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    year: { type: Number },
    genre: { type: String },
    cover: { type: String },
    youtube: { type: String },
    
    // Analytics fields
    playCount: { 
        type: Number, 
        default: 1 
    },
    rating: { 
        type: Number, 
        min: 0, 
        max: 5, 
        default: 0 
    },
    lastPlayed: { 
        type: Date, 
        default: Date.now 
    }
}, { 
    timestamps: true // Automatically creates createdAt and updatedAt
});

// Create a compound index so a user only has one history entry per song
MusicHistorySchema.index({ userid: 1, instanceid: 1 }, { unique: true });

module.exports = mongoose.model('MusicHistory', MusicHistorySchema);
