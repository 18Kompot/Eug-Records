const express = require("express");
const router = express.Router();
const recordsController = require("../controllers/records.js");

router.get("/", recordsController.list);

module.exports = router;
