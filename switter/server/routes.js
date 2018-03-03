const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const jwt = require("express-jwt");
const auth = jwt({
  secret: jwt_secret,
  requestProperty: "payload"
});

const authCtrl = require("./authController");

router.get("/auth/google", authCtrl.goAuth);
router.get("/auth/google/callback", authCtrl.goAuthCB);

module.exports = router;
