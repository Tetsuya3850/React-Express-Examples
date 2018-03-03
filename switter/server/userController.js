const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Sweet = mongoose.model("Sweet");
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

module.exports.ownSweets = async (req, res, next) => {
  const own = await User.find({ _id: req.params.uid }).populate({
    path: "sweets",
    populate: { path: "author" }
  });
  res.json(own[0].sweets);
};

module.exports.add = async (req, res, next) => {
  const newSweet = new Sweet(req.body);
  try {
    const addedSweet = await newSweet.save();
    await User.findOneAndUpdate(
      { _id: req.params.uid },
      { $push: { sweets: addedSweet._id } }
    );
    res.json(addedSweet.populate("author"));
  } catch (err) {
    return next(err);
  }
};
