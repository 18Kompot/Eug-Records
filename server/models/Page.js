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

// const aboutPageTest = new Page({
//   name: "about",
//   content: "<h1>Hello, About!</h1>",
// });
// aboutPageTest.save();

// const aboutPageTest = new Page({
//   name: "equipment",
//   content: "<h1>Hello, About!</h1>",
// });
// aboutPageTest.save();

exports.Page = Page;
