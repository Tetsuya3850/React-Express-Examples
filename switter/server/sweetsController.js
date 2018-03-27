const mongoose = require("mongoose");
const Sweet = mongoose.model("Sweet");
const User = mongoose.model("User");

module.exports.getFeed = async (req, res, next) => {
  try {
    const sweets = await Sweet.find()
      .sort({ created: -1 })
      .limit(30)
      .populate("author");
    res.status(200).json(sweets);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getUserSweets = async (req, res, next) => {
  try {
    const userSweets = await Sweet.find({ author: req.params.uid })
      .sort({ created: -1 })
      .limit(20)
      .populate("author");
    res.status(200).json(userSweets);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getSweetDetail = async (req, res, next) => {
  try {
    const sweet = await Sweet.findOne({ _id: req.params.sweetId })
      .populate("author")
      .populate("comments.author");
    res.status(200).json(sweet);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.add = async (req, res, next) => {
  const newSweet = new Sweet(req.body);
  try {
    await newSweet.save();
    await newSweet.populate("author").execPopulate();
    res.status(200).json(newSweet);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.toggleLike = async (req, res, next) => {
  try {
    const uid = req.me._id;
    const { sweetId } = req.params;
    const user = await User.findOne({
      _id: uid,
      likedSweetIds: sweetId
    });
    if (!user) {
      await User.findByIdAndUpdate(uid, { $push: { likedSweetIds: sweetId } });
      await Sweet.findByIdAndUpdate(sweetId, { $push: { likedUserIds: uid } });
      res.status(200).json("Liked!");
    } else {
      await User.findByIdAndUpdate(uid, {
        $pull: { likedSweetIds: sweetId }
      });
      await Sweet.findByIdAndUpdate(sweetId, {
        $pull: { likedUserIds: uid }
      });
      res.status(200).json("Unliked!");
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.comment = async (req, res, next) => {
  try {
    const { sweetId } = req.params;
    const sweet = await Sweet.findOne({ _id: sweetId });
    sweet.comments.push(req.body);
    await sweet.save();
    await sweet.populate("comments.author").execPopulate();
    const commentWithIdAndAuthor = sweet.comments[sweet.comments.length - 1];
    res.status(200).json(commentWithIdAndAuthor);
  } catch (e) {
    res.status(500).json(e);
  }
};
