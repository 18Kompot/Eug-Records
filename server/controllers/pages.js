const { Page } = require("../models/Page");
const joi = require("joi");

module.exports = {
  getPage: async function (req, res, next) {
    try {
      const name = req.params.name;
      const page = await Page.findOne({ name: name });

      res.json({
        error: !page ? "page not found" : undefined,
        content: page ? page.content : undefined,
      });
    } catch (err) {
      res.status(400).json({ error: "error getting the page" });
    }
  },

  edit: async function (req, res, next) {
    try {
      const scheme = joi.object({
        content: joi.string().required().allow(""),
      });

      const { error, value } = scheme.validate(req.body);
      if (error) {
        res.status(400).json({ error: "invalid data" });
        return;
      }

      let page = await Page.findOneAndUpdate(
        {
          name: req.params.name,
        },
        { $set: { content: value.content } }
      );

      // The page doesn't exist yet. Make it. The user has edited the page.
      if (!page) {
        page = new Page({ name: req.params.name, content: value.content });
        await page.save();
      }

      res.status(200).json({ status: 200 });
    } catch (err) {
      res.status(400).json({ error: "failed to update data" });
    }
  },
};
