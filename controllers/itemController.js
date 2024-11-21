const Item = require("../models/item");
const User = require("../models/user");

// get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get items by user id
const getItemsByUserId = async (req, res) => {
  const user = req.params.userId;
  try {
    const items = await Item.find({ user });
    if (!items || items.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "No items found for this user" });
    res.status(200).json({ success: true, items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get item by item id
const getUserByItemId = async (req, res) => {
  const _id = req.params.itemId;
  try {
    const item = await Item.findById({ _id });
    const userId = item.user;
    const user = await User.findById({ _id: userId });
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found!" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create an item
const createItem = async (req, res) => {
  const userId = req.params.id; // Get userId from the URL params
  const items = req.body; // Get the array of items from the request body
  // Validate if the array is not empty
  if (!Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ error: "Items array is required and cannot be empty" });
  }

  // Ensure each item has the required fields
  const validItems = items.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    description: item.description,
    user: userId, // Associate the items with the userId
  }));

  try {
    // Insert multiple items at once
    await Item.insertMany(validItems);
    res
      .status(201)
      .json({ success: true, message: "Items added successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// update an item
const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) return res.status(404).json({ error: "Item not found!" });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete an item
const deleteItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    const deletedItem = await Item.findByIdAndDelete({ _id: itemId });
    if (!deletedItem) return res.status(404).json({ error: "Item not found!" });
    res.status(200).json({ message: "Item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllItems,
  createItem,
  getItemsByUserId,
  getUserByItemId,
  updateItem,
  deleteItem,
};
