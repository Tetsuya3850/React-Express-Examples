const mongoose = require("mongoose");
const Sweet = mongoose.model("Sweet");

module.exports.getFeed = async (req, res, next) => {
  const sweets = await Sweet.find().populate("author");
  res.json(sweets);
};
