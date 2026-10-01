const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    dealName: { type: String, required: true },
    acquirer: { type: String, default: "" },
    target: { type: String, default: "" },
    year: { type: String, default: "" },
    value: { type: String, default: "" },
    type: { type: String, enum: ["Acquisition", "Merger", "Divestiture"], default: "Acquisition" },
    status: { type: String, default: "" },
    description: { type: String, default: "" }
  },
  { _id: false }
);

const MandATransactionsSchema = new mongoose.Schema(
  {
    installationId: { type: String, required: true, unique: true, index: true },
    name: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    position: { type: String, default: "" },
    address1: { type: String, default: "" },
    address2: { type: String, default: "" },
    description: { type: String, default: "" },
    transactions: { type: [TransactionSchema], default: [] },
    updatedBy: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MandATransactions", MandATransactionsSchema);
