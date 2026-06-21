const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: false
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    cover: {
        type: String,
        required: false,
        trim: true
    },
    youtube: {
        type: String,
        required: false,
        trim: true
    },

    // NEW FIELDS (matching Song)
    userid: {
        type: String,
        required: false,
        index: true
    },
    instanceid: {
        type: String,
        required: false,
        index: true
    }
});

module.exports = mongoose.model("Album", AlbumSchema);
