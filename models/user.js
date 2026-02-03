cconst mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // -------------------------------------------------
    // Core Identity
    // -------------------------------------------------
    id: { type: Number },
    userid: { type: Number },

    firstname: { type: String, trim: true },
    lastname: { type: String, trim: true },
    username: { type: String, trim: true },

    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 150
    },

    displayname: { type: String, trim: true },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },

    phone: { type: String, trim: true },
    fax: { type: String, trim: true },
    btnphone: { type: String, trim: true },

    dateOfBirth: { type: String, trim: true },

    // -------------------------------------------------
    // Address Information
    // -------------------------------------------------
    address1: { type: String, trim: true },
    address2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalzip: { type: String, trim: true },
    country: { type: String, trim: true },

    // -------------------------------------------------
    // Authentication & Security
    // -------------------------------------------------
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 200
    },

    plainpassword: { type: String, trim: true },
    hashedpassword: { type: String, trim: true },
    passwordtype: { type: Number, default: 0 },

    resettoken: { type: String, trim: true },
    resettokenexpiration: { type: Date },

    usertwofactorenabled: { type: Boolean, default: false },
    usertwofactortype: { type: String, trim: true },
    usertwofactorkeysmsdestination: { type: String, trim: true },
    twofactorkeyemaildestination: { type: String, trim: true },
    twofactorprovider: { type: String, trim: true },
    twofactorprovidertoken: { type: String, trim: true },
    twofactorproviderauthstring: { type: String, trim: true },

    // -------------------------------------------------
    // Employment / Corporate IDs
    // -------------------------------------------------
    employee: { type: Boolean, default: false },
    employeeid: { type: String, trim: true },
    microsoftid: { type: String, trim: true },
    ncrid: { type: String, trim: true },
    oracleid: { type: String, trim: true },
    azureid: { type: String, trim: true },

    // -------------------------------------------------
    // Company / Branch / Role
    // -------------------------------------------------
    companyId: { type: String, trim: true }, // original
    companyid: { type: Number },            // numeric version

    branchId: { type: String, trim: true },

    role: {
      type: String,
      enum: ["admin", "manager", "user", "superuser"],
      default: "user"
    },

    corporateuser: {
      type: String,
      trim: true,
      default: "False"
    },

    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active"
    },

    // -------------------------------------------------
    // Account Status / Actions
    // -------------------------------------------------
    accountstatus: { type: String, trim: true },
    accountactiondate: { type: String, trim: true },
    accountactiondescription: { type: String, trim: true },

    // -------------------------------------------------
    // Groups / Permissions
    // -------------------------------------------------
    groupid1: { type: String, trim: true },
    groupid2: { type: String, trim: true },
    groupid3: { type: String, trim: true },
    groupid4: { type: String, trim: true },
    groupid5: { type: String, trim: true },

    // -------------------------------------------------
    // Misc System Fields
    // -------------------------------------------------
    jid: { type: Number },
    btn: { type: String, trim: true },
    iscertified: { type: Boolean, default: false },

    uidstring: { type: String, trim: true },
    activepictureurl: { type: String, trim: true },

    cartMasterIndex: { type: Number, default: 0 },
    userProfileIndex: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
