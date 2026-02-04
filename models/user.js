const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // -------------------------------------------------
    // Core Identity
    // -------------------------------------------------
    id: Number,
    userid: Number,
    useridstring: { type: String, trim: true }, // merged from userprofile
    uidstring: { type: String, trim: true },    // keep existing for compatibility

    firstname: { type: String, trim: true },
    lastname: { type: String, trim: true },
    fullname: { type: String, required: true, trim: true, minlength: 1, maxlength: 150 },
    displayname: { type: String, trim: true },
    username: { type: String, trim: true },
    pronoun: { type: String, trim: true }, // added

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },

    phone: { type: String, trim: true },
    cellphone: { type: String, trim: true }, // added
    sms: Number, // added
    fax: { type: String, trim: true },
    btnphone: { type: String, trim: true },

    dateOfBirth: { type: String, trim: true },
    maritalstatus: { type: String, trim: true }, // added

    // -------------------------------------------------
    // Address
    // -------------------------------------------------
    address1: { type: String, trim: true },
    address2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalzip: { type: String, trim: true },
    country: { type: String, trim: true },

    // -------------------------------------------------
    // Authentication
    // -------------------------------------------------
    password: { type: String, required: true, minlength: 4, maxlength: 200 },
    plainpassword: { type: String, trim: true },
    hashedpassword: { type: String, trim: true },
    passwordtype: { type: Number, default: 0 },

    resettoken: { type: String, trim: true },
    resettokenexpiration: Date,

    usertwofactorenabled: { type: Boolean, default: false },
    usertwofactortype: { type: String, trim: true },
    usertwofactorkeysmsdestination: { type: String, trim: true },
    twofactorkeyemaildestination: { type: String, trim: true },
    twofactorprovider: { type: String, trim: true },
    twofactorprovidertoken: { type: String, trim: true },
    twofactorproviderauthstring: { type: String, trim: true },

    // -------------------------------------------------
    // Employment
    // -------------------------------------------------
    employee: { type: Boolean, default: false },
    employeeid: { type: String, trim: true },

    buid: Number,       // added
    managerid: Number,  // added
    regionid: Number,   // added

    microsoftid: { type: String, trim: true },
    ncrid: { type: String, trim: true },
    oracleid: { type: String, trim: true },
    azureid: { type: String, trim: true },

    // -------------------------------------------------
    // Company / Branch
    // -------------------------------------------------
    companyId: { type: String, trim: true },
    companyid: { type: String, trim: true }, // unified to string to match userprofile

    branchId: { type: String, trim: true },
    branchid: Number, // added numeric version

    role: {
      type: String,
      enum: ["admin", "manager", "user", "superuser"],
      default: "user"
    },

    corporateuser: { type: String, trim: true, default: "False" },

    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active"
    },

    // -------------------------------------------------
    // Education
    // -------------------------------------------------
    university: { type: String, trim: true },
    university1: { type: String, trim: true },
    university2: { type: String, trim: true },

    // -------------------------------------------------
    // Social Links
    // -------------------------------------------------
    linkedinurl: { type: String, trim: true },
    instagramurl: { type: String, trim: true },
    vimeourl: { type: String, trim: true },
    facebookurl: { type: String, trim: true },
    googleurl: { type: String, trim: true },

    // -------------------------------------------------
    // System Fields
    // -------------------------------------------------
    jid: Number,
    btn: { type: String, trim: true },
    iscertified: { type: Boolean, default: false },

    activepictureurl: { type: String, trim: true },

    defaultinstanceid: { type: String, trim: true },
    defaultshardid: { type: String, trim: true },

    cartMasterIndex: { type: Number, default: 0 },
    userProfileIndex: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
