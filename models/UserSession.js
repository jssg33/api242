const mongoose = require("mongoose");

const userSessionSchema = new mongoose.Schema(
  {
    id: { type: Number },
    userid: { type: Number, required: true },
    token: { type: String, required: true },

    acknowledged: { type: Number, default: 0 },
    actionpriority: { type: Number, default: 0 },

    sessionstart: { type: String },
    sessionend: { type: String },

    sessionrecorded: { type: Number, default: 0 },
    sessionrecordurl: { type: String },

    sessiondescription: { type: String },

    sessionusername: { type: String },
    sessionemail: { type: String },
    sessionfirstname: { type: String },
    sessionlastname: { type: String },
    sessionfullname: { type: String },

    sessioncomplete: { type: Number, default: 0 },

    twofactorkey: { type: String },
    twofactorkeysmsdestination: { type: String },
    twofactorkeyemaildestination: { type: String },
    twofactorprovider: { type: String },
    twofactorprovidertoken: { type: String },
    twofactorproviderauthstring: { type: String },

    useridasstring: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserSession", userSessionSchema);
