const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "item is required"],
    },
    quantity: {
      type: Number,
      required: [1, "quantity must be atleast 1"],
    },
    description: {
      type: String,
      maxLength: 255,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
