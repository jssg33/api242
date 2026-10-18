const crypto = require("crypto");

const Ctssnmpv5 = require("../models/Ctssnmpv5");
const User = require("../models/user");

async function validateUser(apiusername, apipassword) {

    const user = await User.findOne({
        apiusername: apiusername,
        apipassword: apipassword
    });

    return !!user;
}

exports.getAll = async (req, res) => {

    try {

        const {
            apiusername,
            apipassword
        } = req.params;

        if (!(await validateUser(
            apiusername,
            apipassword
        ))) {

            return res.status(401).json({
                message: "Unauthorized"
            });

        }

        const data = await Ctssnmpv5.find()
            .sort({
                receivedUtc: -1
            });

        return res.json(data);

    }
    catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

};

exports.getById = async (req, res) => {

    try {

        const {
            apiusername,
            apipassword,
            id
        } = req.params;

        if (!(await validateUser(
            apiusername,
            apipassword
        ))) {

            return res.status(401).json({
                message: "Unauthorized"
            });

        }

        const record =
            await Ctssnmpv5.findById(id);

        if (!record) {

            return res.status(404).json({
                message: "Record not found"
            });

        }

        return res.json(record);

    }
    catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

};

exports.create = async (req, res) => {

    try {

        const {
            apiusername,
            apipassword
        } = req.params;

        if (!(await validateUser(
            apiusername,
            apipassword
        ))) {

            return res.status(401).json({
                message: "Unauthorized"
            });

        }

        const payload = req.body;

        if (!payload.messageGuid) {

            payload.messageGuid =
                crypto.randomUUID();

        }

        payload.receivedUtc =
            new Date();

        const record =
            new Ctssnmpv5(payload);

        await record.save();

        return res.status(201).json(
            record
        );

    }
    catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

};

exports.update = async (req, res) => {

    try {

        const {
            apiusername,
            apipassword,
            id
        } = req.params;

        if (!(await validateUser(
            apiusername,
            apipassword
        ))) {

            return res.status(401).json({
                message: "Unauthorized"
            });

        }

        const record =
            await Ctssnmpv5.findByIdAndUpdate(
                id,
                req.body,
                {
                    new: true
                }
            );

        if (!record) {

            return res.status(404).json({
                message: "Record not found"
            });

        }

        return res.json(record);

    }
    catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

};

exports.remove = async (req, res) => {

    try {

        const {
            apiusername,
            apipassword,
            id
        } = req.params;

        if (!(await validateUser(
            apiusername,
            apipassword
        ))) {

            return res.status(401).json({
                message: "Unauthorized"
            });

        }

        const deleted =
            await Ctssnmpv5.findByIdAndDelete(
                id
            );

        if (!deleted) {

            return res.status(404).json({
                message: "Record not found"
            });

        }

        return res.json({
            success: true,
            id
        });

    }
    catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

};
