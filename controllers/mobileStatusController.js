// controllers/mobileStatusController.js
const MobileStatus = require("../models/MobileStatus");

exports.getMobileStatus = async (req, res) => {
  try {
    const status = await MobileStatus.findOne().sort({ sequenceGuid: -1 });

    if (!status) {
      return res.status(404).json({ message: "Mobile status not found" });
    }

    res.json(status);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
