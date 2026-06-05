const mongoose = require("mongoose");

const BootstrapMobileSchema = new mongoose.Schema({
  // Server IPs (flat fields)
  loginServer1: { type: String, required: true },
  loginServer2: { type: String, required: true },
  loginServer3: { type: String, required: true },

  registrationServer1: { type: String, required: true },
  registrationServer2: { type: String, required: true },
  registrationServer3: { type: String, required: true },

  // Cipher settings
  loginCipherOffset: { type: String, required: true },
  restCipherOffset: { type: String, required: true },
  cipherDefaultAlgorithm: { type: String, required: true },

  // Domain + DNS
  defaultDomainName: { type: String, required: true },
  dnsServers: { type: [String], required: true },

  // Customer + instance metadata
  instanceId: { type: String, required: true },
  instanceName: { type: String, required: true },
  customerName: { type: String, required: true },
  customerId: { type: String, required: true },
  region: { type: String, required: true }
});

module.exports = mongoose.model("BootstrapMobile", BootstrapMobileSchema);
