const mongoose = require("mongoose");

const userHelpSchema = new mongoose.Schema(
  {
    ticketid: { type: String, required: true, trim: true },
    emplid: { type: Number, required: true },
    descr: { type: String, required: true, trim: true },
    severity: { type: Number, required: true },
    userid: { type: Number, required: true },
    email: { type: String, required: true, trim: true },
    fullname: { type: String, required: true, trim: true },
    bestcontactnumber: { type: String, required: true, trim: true },
    replied: { type: String, default: "" },
    repliedmanagerid: { type: String, default: "" },
    repliedmanagerphone: { type: String, default: "" },
    repliedmanageremail: { type: String, default: "" },
    ticketdate: { type: Date, required: true },
    responsedate: { type: Date },
    ticketstatus: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserHelp", userHelpSchema);
