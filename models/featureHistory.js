const mongoose = require('mongoose');

const FeatureHistorySchema = new mongoose.Schema({
    // Link to the user (Mongo ID)
    userId: { 
        type: String, 
        required: true, 
        index: true 
    },
    // The R.id or unique string name of the fragment/tool
    featureId: { 
        type: String, 
        required: true 
    },
    // Friendly name for the bar graph labels
    featureName: { 
        type: String, 
        required: true 
    },
    
    // Usage stats
    useCount: { 
        type: Number, 
        default: 1 
    },
    lastUsed: { 
        type: Date, 
        default: Date.now 
    }
}, { 
    timestamps: true 
});

// Ensure one record per user per feature for easy incrementing
FeatureHistorySchema.index({ userId: 1, featureId: 1 }, { unique: true });

module.exports = mongoose.model('FeatureHistory', FeatureHistorySchema);
