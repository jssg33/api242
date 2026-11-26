// Audit/controllers/apidirectory.controller.js — port of analyticsgen4rev2/Audit/apidirectory.controller.cs
// (ApiDirectoryEndpoints). List/Get/Create/Delete are a straight port (soft-delete via isDeleted). SyncApplication
// and GetDirectoryApplications call Microsoft Graph in the C# (Azure.Identity + Microsoft.Graph) — this project
// has no Graph SDK/credentials wired in, so both answer 501 naming what's missing instead of silently no-op'ing
// or faking a Graph response.
const ApiDirectory = require("../models/apidirectory.model");
const Application = require("../models/apiapplications.model");

exports.list = async (req, res) => {
  try {
    const results = await ApiDirectory.find({ isDeleted: { $ne: true } }).sort({ tenantName: 1 });
    res.json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await ApiDirectory.findOne({ _id: req.params.id, isDeleted: { $ne: true } });
    if (!result) return res.status(404).end();
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const directory = await ApiDirectory.create({ ...req.body, createdDate: new Date() });
    res.json(directory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const directory = await ApiDirectory.findById(req.params.id);
    if (!directory) return res.status(404).end();
    directory.isDeleted = true;
    directory.modifiedDate = new Date();
    await directory.save();
    res.json(directory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.syncApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId);
    if (!application) return res.status(404).json({ error: "Application Not Found" });
    if (!application.directoryId) return res.status(400).json({ error: "DirectoryId Is Null" });

    const directory = await ApiDirectory.findOne({ _id: application.directoryId, isDeleted: { $ne: true } });
    if (!directory) return res.status(400).json({ error: "Directory Not Found" });

    res.status(501).json({
      error: "Entra application sync needs the Microsoft Graph SDK and Azure credentials, neither of which is wired into this API yet.",
      directoryId: directory._id,
      applicationId: application._id
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDirectoryApplications = async (req, res) => {
  try {
    const directory = await ApiDirectory.findOne({ _id: req.params.directoryId, isDeleted: { $ne: true } });
    if (!directory) return res.status(404).end();

    res.status(501).json({
      error: "Listing Entra applications needs the Microsoft Graph SDK and Azure credentials, neither of which is wired into this API yet.",
      directoryId: directory._id
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
