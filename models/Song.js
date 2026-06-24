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
        required: false,
        trim: true
    },
    albumId: {
        type: String,
        required: false,
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
        required: true,
        trim: true
    },

    // NEW FIELDS
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

module.exports = mongoose.model("Song", SongSchema);
