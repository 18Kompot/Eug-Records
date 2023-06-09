const { User } = require("../models/User");
const { Cart } = require("../models/Cart");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const userId = req.params.userId;
      const cart = await Cart.find({ userId: userId });

      if (!cart) {
        res.json({});
        return;
      }

      let records = [];
      var db = req.client.database();
      for (let i = 0; i < cart.length; i++) {
        const data = await db.getRelease(cart.at(i).recordId);
        records.push({
          ...data,
          cover_image: data.images[0].resource_url,
        });
      }

      res.json({
        records: records,
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
