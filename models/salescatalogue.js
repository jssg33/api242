const mongoose = require('mongoose');

const SalesCatalogueSchema = new mongoose.Schema({
  salesCatalogueId: {
    type: Number,
    required: true
  },
  parkId: {
    type: Number,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  serviceName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  isActive: {
    type: Number,
    default: 0
  },
  state: {
    type: Number,
    default: 0
  },
  global: {
    type: Number,
    default: 0
  },
  qtyadults: {
    type: Number,
    default: 0
  },
  qtychildren: {
    type: Number,
    default: 0
  },
  national: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  productclass: {
    type: String
  }
  siteid: {
    type: String
  }
  }});

module.exports = mongoose.model('SalesCatalogue', SalesCatalogueSchema);
