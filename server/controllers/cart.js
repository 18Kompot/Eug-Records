const { User } = require("../models/User");
const { Cart } = require("../models/Cart");
const Discogs = require("disconnect").Client;

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const userId = req.params.userId;
      const cart = await Cart.find({ userId: userId });

      if (!cart) {
        res.json({});
        return;
      }

      var db = new Discogs().database();
      let cartRecords = new Array();

      for (let i = 0; i < cart.length; i++) {
        db.getRelease(cart.at(i).recordId, function (err, data) {
          console.log(data);
          cartRecords.push(data);
        });
      }

      res.json({
        records: cartRecords,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting the page" });
    }
  },

  add: async function (req, res, next) {
    try {
      // Check to see if a user already exists with the form's email.
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        throw new Error("User does not exist.");
      }

      const cartItem = await Cart.findOne({
        userId: user._id,
        recordId: req.params.recordId,
      });
      if (cartItem) {
        throw new Error("Item already in cart");
      }

      // Create new cart item.
      const newCartItem = new Cart({
        userId: user._id,
        recordId: req.params.recordId,
      });
      await newCartItem.save();

      // Mark the operation as successful by setting the result JSON to
      // the new user's mongoose document object.
      res.json({
        userId: user._id,
        recordId: newCartItem.recordId,
        cartId: newCartItem._id,
      });
    } catch (err) {
      console.log(`[addCartItem] ${err}`);
      res.status(400).json({ error: `${err}` });
    }
  },

  delete: async function (req, res, next) {
    try {
      console.log(JSON.stringify(req.params));
      // Check to see if a user already exists with the form's email.
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        throw new Error("User does not exist.");
      }

      const cartItem = await Cart.findOne({
        userId: user._id,
        recordId: req.params.recordId,
      });
      if (!cartItem) {
        throw new Error("Item is not in cart");
      }
      await cartItem.deleteOne();
      res.json({});
    } catch (err) {
      console.log(`[addCartItem] ${err}`);
      res.status(400).json({ error: `${err}` });
    }
  },
};
