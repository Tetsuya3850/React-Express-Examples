const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;

module.exports.goAuth = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: req.query.linkinguri
  })(req, res, next);
};

module.exports.goAuthCB = (req, res, next) => {
  passport.authenticate("google", (err, user, info) =>
    generateTokenAndRedirect(req, res, next, err, user, info)
  )(req, res, next);
};

const generateTokenAndRedirect = (req, res, next, err, user, info) => {
  if (err) {
    return next(err);
  }
  if (user) {
    const token = user.generateJwt();
    return res.redirect(`${req.query.state}?token=${token}`);
  } else {
    return res.redirect("${req.query.state}");
  }
};

module.exports.getUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.uid });
  res.json(user);
};
