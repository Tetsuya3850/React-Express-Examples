const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
var jwt = require("express-jwt");
var auth = jwt({
  secret: jwt_secret,
  requestProperty: "payload"
});

const authCtrl = require("../controllers/authentication");
const profileCtrl = require("../controllers/profile");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/auth/facebook", authCtrl.fbAuth);
router.get("/auth/facebook/callback", authCtrl.fbAuthCB);

router.get("/secret/:uid", auth, profileCtrl.secret);

module.exports = router;
