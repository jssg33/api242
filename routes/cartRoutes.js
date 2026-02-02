const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");

router.get("/", controller.getAllCarts);
router.get("/:id", controller.getCartById);
router.post("/", controller.createCart);
router.put("/:id", controller.updateCart);
router.delete("/:id", controller.deleteCart);

module.exports = router;
