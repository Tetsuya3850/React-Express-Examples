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

module.exports.getItem = async (req, res, next) => {
  try {
    const item = await Item.findOne({ _id: req.params.itemid }).populate(
      "reviews.author"
    );
    res.status(200).json(item);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.addReview = async (req, res, next) => {
  try {
    const item = await Item.findOne({ _id: req.params.itemId });
    item.reviews.push(req.body);
    await item.save();
    const user = await User.findOne({ _id: req.me._id });
    user.reviewedItems.push(req.params.itemId);
    await user.save();
    res.status(200).json(item.reviews);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.editReview = async (req, res, next) => {
  try {
    await Item.update(
      { _id: req.params.itemId },
      {
        $pull: { reviews: { _id: req.body._id } }
      }
    );
    const item = await Item.findByIdAndUpdate(
      req.params.itemId,
      {
        $push: { reviews: req.body }
      },
      { new: true }
    );
    res.status(200).json(item.reviews);
  } catch (e) {
    res.status(500).json(e);
  }
};
