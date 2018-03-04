const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const jwt = require("express-jwt");
const auth = jwt({
  secret: jwt_secret,
  requestProperty: "me"
});

const usersCtrl = require("./usersController");
const sweetsCtrl = require("./sweetsController");

router.get("/auth/google", usersCtrl.goAuth);
router.get("/auth/google/callback", usersCtrl.goAuthCB);
router.get("/users/:uid", auth, usersCtrl.getUser);

router.get("/sweets/feed", auth, sweetsCtrl.getFeed);
router.get("/sweets/users/:uid", auth, sweetsCtrl.getUserSweets);
router.get("/sweets/comments/:sweetId", auth, sweetsCtrl.getSweet);
router.post("/sweets/add", auth, sweetsCtrl.add);
router.post("/sweets/togglelike", auth, sweetsCtrl.toggleLike);
router.post("/sweets/comment", auth, sweetsCtrl.comment);

module.exports = router;
