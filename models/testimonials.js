const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      required: true,
      trim: true
    },
    productName: {
      type: String,
      required: true,
      trim: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    },
    year: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true // automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
