const express = require("express");
const router = express.Router();
const userCtrl = require("./userController");
const { protect } = require("./userModel");

router.post("/signup", userCtrl.signup);
router.post("/signin", userCtrl.signin);
router.get("/:userId", protect, userCtrl.getUser);

module.exports = router;
