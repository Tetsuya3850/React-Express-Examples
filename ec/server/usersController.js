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
    const user = await User.findOne({ _id: req.me._id });
    const cartIds = Object.keys(user.cart);
    const itemDetails = await Item.find({
      _id: {
        $in: cartIds
      }
    });
    const response = {
      cart: user.cart,
      details: itemDetails
    };
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getHistory = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.me._id });
    let orderIds = [];
    user.orders.forEach(order => {
      for (const key in order.cart) {
        orderIds.push(key);
      }
    });
    const itemDetails = await Item.find({
      _id: {
        $in: orderIds
      }
    });
    const response = {
      orders: user.orders.slice().reverse(),
      details: itemDetails
    };
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.addItem = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const item = await Item.findOne({ _id: itemId });
    if (item.stock === 0) {
      res.status(500).json("Sorry, out of Stock.");
      return;
    }
    const user = await User.findOne({ _id: req.me._id });
    user.cart[itemId] = 1;
    user.markModified("cart");
    await user.save();
    item.stock -= 1;
    await item.save();
    const response = {
      cart: user.cart,
      stock: item.stock
    };
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.editNum = async (req, res, next) => {
  try {
    const { itemId, num } = req.body;
    const item = await Item.findOne({ _id: itemId });
    const user = await User.findOne({ _id: req.me._id });
    const change = num - parseInt(user.cart[itemId]);
    if (item.stock < change) {
      res.status(500).json("Sorry, out of Stock");
      return;
    }
    user.cart[itemId] = num;
    user.markModified("cart");
    await user.save();
    item.stock -= change;
    await item.save();
    const response = {
      cart: user.cart,
      stock: item.stock
    };
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.deleteItem = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const user = await User.findOne({ _id: req.me._id });
    const item = await Item.findOne({ _id: itemId });
    const change = user.cart[itemId];
    delete user.cart[itemId];
    user.markModified("cart");
    await user.save();
    item.stock += parseInt(change);
    await item.save();
    const response = {
      cart: user.cart,
      stock: item.stock
    };
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.order = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.me._id });
    user.orders.push({ cart: user.cart, create: Date.now() });
    user.cart = {};
    user.markModified("cart");
    await user.save();
    res.status(200).json("Ordered!");
  } catch (e) {
    res.status(500).json(e);
  }
};
