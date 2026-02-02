const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartItemController");

router.get("/", controller.getAllCartItems);
router.get("/:id", controller.getCartItemById);
router.get("/cart/:cartid", controller.getCartItemsByCartId);
router.post("/", controller.createCartItem);
router.put("/:id", controller.updateCartItem);
router.delete("/:id", controller.deleteCartItem);

module.exports = router;
