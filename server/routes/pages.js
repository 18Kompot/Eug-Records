var express = require("express");
var router = express.Router();
const pages = require("../controllers/pages");

router.get("/", pages.getAll);
router.get("/:id", pages.getPage);
router.post("/", pages.add);
router.patch("/:id", pages.edit);
router.delete("/:id", pages.delete);

module.exports = router;
