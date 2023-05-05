const { Page } = require("../models/Page");
const joi = require("joi");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const result = await Page.find({}).sort({ content: 1 });
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting the page" });
    }
  },

  getPage: async function (req, res, next) {
    try {
      const scheme = joi.object({
        _id: joi.string().required(),
      });

      const { error, value } = scheme.validate({ _id: req.params.id });

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const result = await Page.findOne({ _id: value._id });
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting the page" });
    }
  },

  add: async function (req, res, next) {
    try {
      const scheme = joi.object({
        content: joi.string().required(),
      });

      const { error, value } = scheme.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const newPage = new Page(value);
      const result = await newPage.save();

      res.json({
        ...value,
        _id: result._id,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error adding a page" });
    }
  },

  delete: async function (req, res, next) {
    try {
      const scheme = joi.object({
        _id: joi.string().required(),
      });

      const { error, value } = scheme.validate({ _id: req.params.id });

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const deleted = await Page.findOne({ _id: value._id });

      await Page.deleteOne(value).exec();
      res.json(deleted);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error deleting a page" });
    }
  },

  edit: async function (req, res, next) {
    try {
      const scheme = joi.object({
        content: joi.string().required(),
      });

      const { error, value } = scheme.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const page = await Page.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        value
      );

      if (!page) return res.status(404).send("Given ID was not found.");

      const updated = await Page.findOne({ _id: req.params.id });
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "failed to update data" });
    }
  },
};
