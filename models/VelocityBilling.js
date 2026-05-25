const mongoose = require('mongoose');

const VelocityBillingSchema = new mongoose.Schema({
    skuid: { type: String, required: true, unique: true },
    description: { type: String, required: true },

    // Pricing for Tweet Deletes product
    monthlyPrice: { type: Number, default: null },
    annualPrice: { type: Number, default: null },
    oneTimePrice: { type: Number, default: null }

}, { timestamps: true }); // createdAt + updatedAt auto-managed

module.exports = mongoose.model('VelocityBilling', VelocityBillingSchema);
