const mongoose = require("mongoose");
const Sweet = mongoose.model("Sweet");

module.exports.getFeed = async (req, res, next) => {
  const sweets = await Sweet.find().populate("author");
  res.json(sweets);
};

module.exports.getUserSweets = async (req, res, next) => {
  const userSweets = await Sweet.find({ author: req.params.uid }).populate(
    "author"
  );
  res.json(userSweets);
};

module.exports.add = async (req, res, next) => {
  const newSweet = new Sweet(req.body);
  try {
    const addedSweet = await newSweet.save();
    res.json("Sweet Added");
  } catch (err) {
    return next(err);
  }
};
