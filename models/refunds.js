const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema(
  {
    refundId: { type: Number },

    bookingId: { type: Number },

    paymentMethod: { type: String, trim: true },
    cardType: { type: String, trim: true },
    cardLast4: { type: String, trim: true },
    cardExpDate: { type: String, trim: true },

    amountPaid: { type: Number },
    amountRefunded: { type: Number },

    paymentDate: { type: String, trim: true },

    transactionId: { type: String, trim: true },
    refundTransactionId: { type: String, trim: true },

    useridasstring: { type: String, trim: true },
    transtype: { type: String, trim: true },

    fullname: { type: String, trim: true },

    parkName: { type: String, trim: true },
    state: { type: String, trim: true },
    parkId: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Refund", refundSchema);
