const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartMasterController");

router.get("/", controller.getAllCartMasters);
router.get("/:id", controller.getCartMasterById);
router.post("/", controller.createCartMaster);
router.put("/:id", controller.updateCartMaster);
router.delete("/:id", controller.deleteCartMaster);

module.exports = router;
