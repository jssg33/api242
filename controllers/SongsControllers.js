// controllers/SongsController.js
const Song = require("../models/Song");

// Create a new song
exports.createSong = async (req, res) => {
    try {
        const song = new Song(req.body);
        await song.save();
        res.status(201).json(song);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all songs
exports.getAllSongs = async (req, res) => {
    const songs = await Song.find();
    res.json(songs);
};

// Get songs by user
exports.getSongsByUser = async (req, res) => {
    const songs = await Song.find({ userid: req.params.userid });
    res.json(songs);
};

// Get songs by instance
exports.getSongsByInstance = async (req, res) => {
    const songs = await Song.find({ instanceid: req.params.instanceid });
    res.json(songs);
};

// Get a single song
exports.getSongById = async (req, res) => {
    const song = await Song.findById(req.params.id);
    res.json(song);
};

// Update a song
exports.updateSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(song);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a song
exports.deleteSong = async (req, res) => {
    try {
        await Song.findByIdAndDelete(req.params.id);
        res.json({ message: "Song deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
