const mongoose = require("mongoose");
const User = mongoose.model("User");
const Item = mongoose.model("Item");

module.exports.getAll = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getCategory = async (req, res, next) => {
  try {
    const items = await Item.find({ category: req.params.key });
    res.status(200).json(items);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getSearch = async (req, res, next) => {
  try {
    const items = await Item.find({ $text: { $search: req.params.query } });
    res.status(200).json(items);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getProduct = async (req, res, next) => {
  try {
    const item = await Item.findOne({ _id: req.params.itemid });
    res.status(200).json(item);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.addReview = async (req, res, next) => {
  try {
    const item = await Item.findOne({ _id: req.params.itemid });
    item.reviews.push(req.body);
    await item.save();
    await res.status(200).json("Added!");
  } catch (e) {
    res.status(500).json(e);
  }
};
