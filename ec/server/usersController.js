const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Item = mongoose.model("Item");
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

module.exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.uid });
    res.status(200).json(user.cart);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getHistory = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.me._id });
    const orderIds = user.orders.map(order => Object.keys(order.cart));
    const itemDetails = await Item.find({
      _id: {
        $in: orderIds
      }
    });
    const response = {
      orders: user.orders,
      details: itemDetails
    };
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.addItem = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.me._id });
    const { itemid } = req.body;
    user.cart[itemid] = 1;
    user.markModified("cart");
    await user.save();
    await Item.findOneAndUpdate({ _id: itemid }, { $inc: { stock: -1 } });
    res.status(200).json("Added!");
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.editNum = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.me._id });
    const { itemid, change } = req.body;
    user.cart[itemid] = parseInt(user.cart[itemid]) + change;
    user.markModified("cart");
    await user.save();
    await Item.findOneAndUpdate({ _id: itemid }, { $inc: { stock: -change } });
    res.status(200).json("Edited!");
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.deleteItem = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.me._id });
    const { itemid, change } = req.body;
    delete user.cart[itemid];
    user.markModified("cart");
    await user.save();
    await Item.findOneAndUpdate({ _id: itemid }, { $inc: { stock: -change } });
    res.status(200).json("Deleted!");
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.order = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.me._id });
    user.orders.push({ cart: user.cart, create: Date.now() });
    user.cart = {};
    await user.save();
    res.status(200).json("Ordered!");
  } catch (e) {
    res.status(500).json(e);
  }
};
