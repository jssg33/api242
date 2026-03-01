const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
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
    album: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    cover: {
        type: String,
        required: true,
        trim: true
    },
    youtube: {
        type: String,
        required: true,
        trim: true
    },

    // NEW FIELDS
    userid: {
        type: String,
        required: true,
        index: true
    },
    instanceid: {
        type: String,
        required: true,
        index: true
    }
});

module.exports = mongoose.model("Song", SongSchema);
