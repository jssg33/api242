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
