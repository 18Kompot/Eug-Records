const { User } = require("../models/User");
const { Token } = require("../models/Token");
const sendEmail = require("../utils/sendEmail");
const Joi = require("joi");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

module.exports = {
  resetPass: async function (req, res, next) {
    try {
      const schema = Joi.object({ email: Joi.string().email().required() });
      const { error } = schema.validate(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res
          .status(400)
          .json({ message: "user with this email doesn't exist" });

      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
      }

      const link = `${"http://localhost:3001/newpassword/"}${user._id}/${
        token.token
      }`;
      await sendEmail(
        user.email,
        "Eug Records - password reset link",
        `Follow the link to reset your password: ${link}`
      );

      res.json({ message: "password reset link sent to your email account" });
    } catch (error) {
      res.json({ error: "An error occured " });
      console.log(error);
    }
  },

  newPass: async function (req, res, next) {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
        token: Joi.string().required(),
        password: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).json(error.details[0].message);

      const user = await User.findById(req.body.id);
      if (!user)
        return res.status(400).json({ message: "Invalid link or expired" });

      const token = await Token.findOne({
        userId: user._id,
        token: req.body.token,
      });
      if (!token)
        return res.status(400).json({ message: "Invalid link or expired" });

      user.password = await bcrypt.hash(req.body.password, 10);
      await user.save();
      await token.delete();

      res.json({ message: "password reset successful" });
    } catch (error) {
      res.json({ error: "An error occured" });
      console.log(error);
    }
  },
};
