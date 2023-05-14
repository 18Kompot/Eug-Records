const express = require("express");
const router = express.Router();
const pages = require("../controllers/pages");

router.get("/:name", pages.getPage);
router.post("/edit/:name", pages.edit);

module.exports = router;
