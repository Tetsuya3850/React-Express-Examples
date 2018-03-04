const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;

module.exports.goAuth = passport.authenticate("google", {
  scope: ["profile", "email"]
});

module.exports.goAuthCB = function(req, res, next) {
  passport.authenticate("google", (err, user, info) =>
    generateTokenAndRedirect(err, user, info, req, res, next)
  )(req, res);
};

function generateTokenAndRedirect(err, user, info, req, res, next) {
  if (err) {
    return next(err);
  }
  if (user) {
    const token = user.generateJwt();
    res.cookie("auth", token);
    return res.redirect(`http://localhost:3000/socialauthredirect`);
  } else {
    return res.redirect("http://localhost:3000");
  }
}

module.exports.getUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.uid });
  res.json(user);
};

module.exports.getlikeIds = async (req, res, next) => {
  const user = await User.findOne({ _id: req.me._id });
  res.json(user.likedSweetIds);
};
