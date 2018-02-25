const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/authentication");
const profileCtrl = require("../controllers/profile");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);

router.get("/secret", authCtrl.isLoggedIn, profileCtrl.secret);

module.exports = router;
