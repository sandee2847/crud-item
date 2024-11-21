const express = require("express");
const protect = require("../middlewares/protect");
const {
  getAllItems,
  getItemsByUserId,
  getUserByItemId,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

const router = express.Router();

router.get("/", protect, getAllItems);
router.post("/add/:id", protect, createItem);
router.get("/user-specific/:userId", protect, getItemsByUserId);
router.get("/specific-item/:itemId", protect, getUserByItemId);
router.put("/:id", protect, updateItem);
router.delete("/:id", protect, deleteItem);

module.exports = router;
