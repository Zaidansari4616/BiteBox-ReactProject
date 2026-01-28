const express = require("express");
const {
  getFoods,
  createFood,
  updateFood,
  deleteFood
} = require("../controllers/foodController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getFoods);          // public
router.post("/", protect, createFood);
router.put("/:id", protect, updateFood);
router.delete("/:id", protect, deleteFood);

module.exports = router;
