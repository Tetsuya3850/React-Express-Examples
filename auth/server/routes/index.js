const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const auth = jwt({
  secret: jwt_secret,
  userProperty: "payload"
});

const authCtrl = require("../controllers/authentication");
const profileCtrl = require("../controllers/profile");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);

module.exports = router;
