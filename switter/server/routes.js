const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const jwt = require("express-jwt");
const auth = jwt({
  secret: jwt_secret,
  requestProperty: "payload"
});

const userCtrl = require("./userController");
const sweetsCtrl = require("./sweetsController");

router.get("/auth/google", userCtrl.goAuth);
router.get("/auth/google/callback", userCtrl.goAuthCB);

router.get("/sweets/feed", auth, sweetsCtrl.getFeed);
router.get("/sweets/:uid", auth, sweetsCtrl.getUserSweets);
router.post("/sweets/add", auth, sweetsCtrl.add);

module.exports = router;
