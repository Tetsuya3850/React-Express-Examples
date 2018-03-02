const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const jwt = require("express-jwt");
const auth = jwt({
  secret: jwt_secret,
  requestProperty: "payload"
});

const authCtrl = require("../controllers/authentication");
const profileCtrl = require("../controllers/profile");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/auth/facebook", authCtrl.fbAuth);
router.get("/auth/facebook/callback", authCtrl.fbAuthCB);
router.get("/auth/google", authCtrl.goAuth);
router.get("/auth/google/callback", authCtrl.goAuthCB);

router.get("/secret/:uid", auth, profileCtrl.secret);

module.exports = router;
