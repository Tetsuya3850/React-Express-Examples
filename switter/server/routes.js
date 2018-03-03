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
const sweetCtrl = require("./sweetController");

router.get("/auth/google", userCtrl.goAuth);
router.get("/auth/google/callback", userCtrl.goAuthCB);
router.get("/users/:uid", auth, userCtrl.ownSweets);
router.post("/users/add/:uid", auth, userCtrl.add);

router.get("/sweet/feed", auth, sweetCtrl.getFeed);

module.exports = router;
