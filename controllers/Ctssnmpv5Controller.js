const { v4: uuidv4 } = require("uuid");
const db = require("../models");

const Ctssnmpv5 = db.Ctssnmpv5;
const User = db.User;

async function validateUser(apiusername, apipassword) {
    const user = await User.findOne({
        where: {
            Username: apiusername,
            Password: apipassword
        }
    });

    return !!user;
}

exports.getAll = async (req, res) => {
    try {
        const { apiusername, apipassword } = req.params;

        if (!(await validateUser(apiusername, apipassword))) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const data = await Ctssnmpv5.findAll();

        return res.json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.getById = async (req, res) => {
    try {
        const { apiusername, apipassword, id } = req.params;

        if (!(await validateUser(apiusername, apipassword))) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const record = await Ctssnmpv5.findByPk(id);

        if (!record) {
            return res.status(404).json({
                message: "Record not found"
            });
        }

        return res.json(record);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.create = async (req, res) => {
    try {
        const { apiusername, apipassword } = req.params;

        if (!(await validateUser(apiusername, apipassword))) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const payload = req.body;

        if (!payload.MessageGuid) {
            payload.MessageGuid = uuidv4();
        }

        payload.ReceivedUtc = new Date();

        const record = await Ctssnmpv5.create(payload);

        return res.status(201).json(record);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.update = async (req, res) => {
    try {
        const { apiusername, apipassword, id } = req.params;

        if (!(await validateUser(apiusername, apipassword))) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const record = await Ctssnmpv5.findByPk(id);

        if (!record) {
            return res.status(404).json({
                message: "Record not found"
            });
        }

        await record.update(req.body);

        return res.json(record);
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.remove = async (req, res) => {
    try {
        const { apiusername, apipassword, id } = req.params;

        if (!(await validateUser(apiusername, apipassword))) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const record = await Ctssnmpv5.findByPk(id);

        if (!record) {
            return res.status(404).json({
                message: "Record not found"
            });
        }

        await record.destroy();

        return res.json({
            message: "Deleted",
            id
        });
    } catch (err) {
        return res.status(500).json(err);
    }
};
