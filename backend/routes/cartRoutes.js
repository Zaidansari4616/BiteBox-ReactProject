const express = require("express");
const { getCart, updateCart } = require("../controllers/cartController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, updateCart);

module.exports = router;
