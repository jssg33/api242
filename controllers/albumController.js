// controllers/albumController.js
const Album = require("../models/Album");

// CREATE
exports.createAlbum = async (req, res) => {
  try {
    const album = new Album(req.body);
    await album.save();
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json({ message: "Error creating album", error: err.message });
  }
};

// READ ALL
exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: "Error fetching albums", error: err.message });
  }
};

// READ ONE
exports.getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.json(album);
  } catch (err) {
    res.status(500).json({ message: "Error fetching album", error: err.message });
  }
};

// UPDATE
exports.updateAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.json(album);
  } catch (err) {
    res.status(500).json({ message: "Error updating album", error: err.message });
  }
};

// DELETE
exports.deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.json({ message: "Album deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting album", error: err.message });
  }
};
