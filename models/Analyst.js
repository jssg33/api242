// models/Analyst.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnalystSchema = new Schema(
  {
    analystId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    region: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
    },


    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: v => /^\S+@\S+\.\S+$/.test(v),
        message: props => `${props.value} is not a valid email`,
      },
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Analyst',
      required: false,
    },

    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    postalCode: String,

    authorityPercentageOverStandard: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Analyst', AnalystSchema);
