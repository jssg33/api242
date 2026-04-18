const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Unique product identifier (string)
    SKEWID: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    // Inventory
    qtyonhand: {
      type: Number,
      required: true,
      default: 0
    },

    // Pricing
    listprice: {
      type: Number,
      required: true
    },
    vpdiscount: {
      type: Number,
      default: 0
    },
    dirdiscount: {
      type: Number,
      default: 0
    },
    managerdiscount: {
      type: Number,
      default: 0
    },

    // Description
    description: {
      type: String,
      trim: true
    },

    // Upgrade flag
    isUpgrade: {
      type: Boolean,
      required: true,
      default: false
    },

    // If product is an upgrade, what product does it upgrade from?
    upgradefromProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false
    },

    // Location / media
    longitude: Number,
    latitude: Number,
    trailmapurl: String,
    parklogourl: String,
    pic1url: String,
    pic2url: String,
    pic3url: String,
    pic4url: String,
    pic5url: String,
    pic6url: String,
    pic7url: String,
    pic8url: String,
    pic9url: String,

    // Vendor information
    vendorid: {
      type: String,
      trim: true
    },
    vendorname: {
      type: String,
      trim: true
    },

    // Warehouse
    warehouseid: {
      type: String,
      default: "001",
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
