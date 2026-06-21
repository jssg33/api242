const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const MobileStatusSchema = new mongoose.Schema({
  sequenceGuid: {
    type: String,
    required: true,
    unique: true,
    default: () => randomUUID()
  },

  latestVersion: { type: String, required: true },
  lastUpdate: { type: String, required: true },

  googlePlayUrl: { type: String, required: false },
  appleStoreUrl: { type: String, required: false },

  snapStoreCommand: {
    type: String,
    required: false,
    default: "snap install gli.velocity.linux"
  },

  config01: { type: String, required: true, default: "configuration.velocity.glocation.info" },
  config02: { type: String, required: true, default: "configuration.velocity.glocation.info" },
  config03: { type: String, required: true, default: "configuration.velocity.glocation.info" },
  config04: { type: String, required: true, default: "configuration.velocity.glocation.info" },
  config05: { type: String, required: true, default: "configuration.velocity.glocation.info" },
  config06: { type: String, required: true, default: "configuration.velocity.glocation.info" },
  config07: { type: String, required: true, default: "configuration.velocity.glocation.info" },
  config08: { type: String, required: true, default: "configuration.velocity.glocation.info" },
  config09: { type: String, required: true, default: "configuration.velocity.glocation.info" },
  config10: { type: String, required: true, default: "configuration.velocity.glocation.info" }
});

module.exports = mongoose.model("MobileStatus", MobileStatusSchema);

