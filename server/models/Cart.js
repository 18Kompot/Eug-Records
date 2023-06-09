const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  recordId: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports.Cart = Cart;
