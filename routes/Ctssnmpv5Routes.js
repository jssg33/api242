const express = require("express");
const router = express.Router();

const controller = require("../controllers/Ctssnmpv5Controller");

router.get(
    "/api/Ctssnmpv5/:apiusername/:apipassword",
    controller.getAll
);

router.get(
    "/api/Ctssnmpv5/:apiusername/:apipassword/:id",
    controller.getById
);

router.post(
    "/api/Ctssnmpv5/:apiusername/:apipassword",
    controller.create
);

router.put(
    "/api/Ctssnmpv5/:apiusername/:apipassword/:id",
    controller.update
);

router.delete(
    "/api/Ctssnmpv5/:apiusername/:apipassword/:id",
    controller.remove
);

module.exports = router;
