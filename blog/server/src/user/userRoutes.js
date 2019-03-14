const express = require("express");
const router = express.Router();
const userCtrl = require("./userController");

router.post("/signup", userCtrl.signup);
router.post("/signin", userCtrl.signin);

module.exports = router;
