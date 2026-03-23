import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    id: { type: Number, default: 0 },
    userid: { type: Number, default: 0 },
    useridstring: { type: String },
    uidstring: { type: String },

    firstname: { type: String },
    lastname: { type: String },
    fullname: { type: String },
    displayname: { type: String },
    username: { type: String },

    pronoun: { type: String },
    maritalstatus: { type: String },

    email: { type: String, required: true },
    phone: { type: String },
    cellphone: { type: String },
    sms: { type: Number, default: 0 },
    fax: { type: String },
    btnphone: { type: String },

    dateOfBirth: { type: String },

    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    state: { type: String },
    postalzip: { type: String },
    country: { type: String },

    password: { type: String },
    plainpassword: { type: String },
    hashedpassword: { type: String },
    passwordtype: { type: Number, default: 0 },

    resettoken: { type: String },
    resettokenexpiration: { type: Date },

    usertwofactorenabled: { type: Boolean, default: false },
    usertwofactortype: { type: String },
    usertwofactorkeysmsdestination: { type: String },
    twofactorkeyemaildestination: { type: String },
    twofactorprovider: { type: String },
    twofactorprovidertoken: { type: String },
    twofactorproviderauthstring: { type: String },

    employee: { type: Boolean, default: true },
    employeeid: { type: String },

    buid: { type: Number, default: 0 },
    managerid: { type: Number, default: 0 },
    regionid: { type: Number, default: 0 },

    microsoftid: { type: String },
    ncrid: { type: String },
    oracleid: { type: String },
    azureid: { type: String },

    companyId: { type: String },
    companyid: { type: String },
    branchId: { type: String },
    branchid: { type: Number, default: 0 },

    role: { type: String, default: "user" },
    corporateuser: { type: String, default: "False" },
    status: { type: String, default: "active" },

    university: { type: String },
    university1: { type: String },
    university2: { type: String },

    linkedinurl: { type: String },
    instagramurl: { type: String },
    vimeourl: { type: String },
    facebookurl: { type: String },
    googleurl: { type: String },

    jid: { type: Number, default: 0 },
    btn: { type: String },

    iscertified: { type: Boolean, default: false },

    activepictureurl: { type: String },

    defaultinstanceid: { type: String },
    defaultshardid: { type: String },

    cartMasterIndex: { type: Number, default: 0 },
    userProfileIndex: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
