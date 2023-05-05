
const { Page } = require("../models/Page");
const joi = require("joi");

module.exports = {
  getPage: async function (req, res, next) {
    try {
      const name = req.params.name;
      const page = await Page.findOne({ name: name });

      if (!page) {
        throw new Error("Failed to find page content.");
      }

      res.json({
        content: page.content
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting the page" });
    }
  },

  edit: async function (req, res, next) {
    try {
      console.log(`[pages.edit] TOP`);

      const scheme = joi.object({
        content: joi.string().required().allow("")
      });

      console.log(`[pages.edit] req: ${req}`);

      const { error, value } = scheme.validate(req.body);
      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const page = await Page.findOneAndUpdate(
        {
          name: req.params.name,
        },
        { $set: { content: value.content } }
      );

      if (!page) return res.status(404).send("Given page name was not found.");

      console.log("Page found. (status: 200)");
      res.status(200).json({ status: 200 });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "failed to update data" });
    }
  },
};
