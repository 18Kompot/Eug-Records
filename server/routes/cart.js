const express = require("express");
const cart = require("../controllers/cart");
const router = express.Router();

router.get("/:userId", cart.getAll);
router.post("/add/:userId/:recordId", cart.add);
router.delete("/:userId/:recordId", cart.delete);

module.exports = router;
