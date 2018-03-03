const mongoose = require("mongoose");
const Sweet = mongoose.model("Sweet");

module.exports.add = async (req, res, next) => {
  const newSweet = new Sweet(req.body);
  try {
    await newSweet.save();
    res.json(newSweet);
  } catch (err) {
    return next(err);
  }
};

module.exports.getFeed = async (req, res, next) => {
  const sweets = await Sweet.find();
  res.json(sweets);
};
