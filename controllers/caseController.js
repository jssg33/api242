const Case = require("../models/case");

// Create Case
exports.createCase = async (req, res) => {
  try {
    const newCase = await Case.create(req.body);

    return res.status(201).json({
      success: true,
      data: newCase,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Cases
exports.getCases = async (req, res) => {
  try {
    const query = {};

    if (req.query.companyid) {
      query.companyid = req.query.companyid;
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.userid) {
      query.userid = req.query.userid;
    }

    const cases = await Case.find(query)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: cases.length,
      data: cases,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Case
exports.getCaseById = async (req, res) => {
  try {
    const caseRecord = await Case.findById(req.params.id);

    if (!caseRecord) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: caseRecord,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get By Case Number
exports.getCaseByNumber = async (req, res) => {
  try {
    const caseRecord = await Case.findOne({
      casenumber: req.params.casenumber,
    });

    if (!caseRecord) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: caseRecord,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Case
exports.updateCase = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCase) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedCase,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Case
exports.deleteCase = async (req, res) => {
  try {
    const caseRecord = await Case.findById(req.params.id);

    if (!caseRecord) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    await caseRecord.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Case deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Approve Case
exports.approveCase = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      {
        approvalstatus: "approved",
        approvedat: new Date(),
      },
      { new: true }
    );

    if (!updatedCase) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedCase,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reject Case
exports.rejectCase = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      {
        approvalstatus: "rejected",
      },
      { new: true }
    );

    if (!updatedCase) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedCase,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
