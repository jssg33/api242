const mongoose = require('mongoose');

const ParkSchema = new mongoose.Schema({
  parkId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  region: {
    type: String
  },
  trailLengthMiles: {
    type: Number,
    default: 0
  },
  difficulty: {
    type: String
  },
  description: {
    type: String
  },
  dayPassPriceUsd: {
    type: Number,
    default: 0
  },
  longitude: {
    type: Number
  },
  latitude: {
    type: Number
  },
  trailmapurl: {
    type: String
  },
  parklogourl: {
    type: String
  },
  state: {
    type: String
  },
  pic1url: String,
  pic2url: String,
  pic3url: String,
  pic4url: String,
  pic5url: String,
  pic6url: String,
  pic7url: String,
  pic8url: String,
  pic9url: String,

  isnationalpark: {
    type: String
  },
  isstatepark: {
    type: String
  },
  hqbranchid: {
    type: String
  },

  mountainbikes: {
    type: Number,
    default: 0
  },
  camping: {
    type: Number,
    default: 0
  },
  rafting: {
    type: Number,
    default: 0
  },
  canoeing: {
    type: Number,
    default: 0
  },
  frisbee: {
    type: Number,
    default: 0
  },
  iscanadian: {
    type: Number,
    default: 0
  },
  ismexican: {
    type: Number,
    default: 0
  },
  motocross: {
    type: Number,
    default: 0
  },
  cabins: {
    type: Number,
    default: 0
  },
  tents: {
    type: Number,
    default: 0
  },
  skiing: {
    type: Number,
    default: 0
  },

  averageRating: {
    type: Number,
    default: 0
  },

  id: {
    type: String
  },

  reviews: {
    type: String
  },

  childPrice: {
    type: Number,
    default: 0
  },
  adultPrice: {
    type: Number,
    default: 0
  },

  maxvisitors: {
    type: Number,
    default: 0
  },
  currentvisitors: {
    type: Number,
    default: 0
  },
  currentvisitorschildren: {
    type: Number,
    default: 0
  },
  currentvisitorsadults: {
    type: Number,
    default: 0
  },

  maxcampsites: {
    type: Number,
    default: 0
  },
  currentcampsites: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Park', ParkSchema);
