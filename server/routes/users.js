const express = require("express");
const router  = express.Router();
const auth    = require("../middleware/auth");
const users   = require("../controllers/users");

router.get("/:id", auth, users.details);

// Retrieve the user's data. This route should only be used for users that were
// previously logged in.
router.get("/fetch/:username", users.get);

/* authentication */
router.post("/login", users.login);
router.post("/signup", users.signup);

module.exports = router;
