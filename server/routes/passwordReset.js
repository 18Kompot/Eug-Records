const express = require("express");
const passReset = require("../controllers/passReset");
const router = express.Router();

router.post("/", passReset.resetPass);
router.post("/newpassword", passReset.newPass);

module.exports = router;
