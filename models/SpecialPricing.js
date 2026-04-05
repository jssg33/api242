// models/SpecialPricing.model.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const SpecialPricingSchema = new Schema(
  {
    quoteId: {
      type: String,
      required: true,
      index: true,
    },

    analystId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // or whatever your analyst model is
      required: false,
    },

    salesRegionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SalesRegion',
      required: true,
    },

    dateSubmitted: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: [
        'Submitted',
        'In Review',
        'Approved',
        'Rejected',
        'Needs More Info',
      ],
      default: 'Submitted',
    },

    longDescription: {
      type: String,
      required: true,
    },

    businessCaseUrls: [
      {
        type: String, // Azure Blob Storage URLs
        validate: {
          validator: function (v) {
            return /^https?:\/\/.+/.test(v);
          },
          message: props => `${props.value} is not a valid URL`,
        },
      },
    ],
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

module.exports = mongoose.model('SpecialPricing', SpecialPricingSchema);
