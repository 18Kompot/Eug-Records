const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
});

const Page = mongoose.model("Page", pageSchema);

exports.Page = Page;
