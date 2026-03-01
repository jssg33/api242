const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        index: true
    },
    instanceid: {
        type: String,
        required: true,
        index: true
    },

    projectname: {
        type: String,
        required: true,
        trim: true
    },

    githubRepoUrl: {
        type: String,
        required: true,
        trim: true
    },

    githubPagesUrl: {
        type: String,
        required: false,
        trim: true
    },

    hostingProviderName: {
        type: String,
        required: false,
        trim: true
    },

    hostingProviderUrl: {
        type: String,
        required: false,
        trim: true
    },

    account: {
        type: String,
        required: false,
        trim: true
    },

    subaccount: {
        type: String,
        required: false,
        trim: true
    },

    companyid: {
        type: String,
        required: false,
        index: true,
        trim: true
    }
});

module.exports = mongoose.model("Project", ProjectSchema);
