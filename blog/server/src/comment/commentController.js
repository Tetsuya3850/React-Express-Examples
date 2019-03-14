const Comment = require("./commentModel");

module.exports.getCommnetByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).end();
  }
};

module.exports.postComment = async (req, res) => {
  if (!req.body.text || req.body.text.length > 200) {
    return res.status(400).end();
  }

  try {
    const comment = await Comment.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).end();
  }
};

module.exports.editComment = async (req, res) => {
  if (!req.body.text || req.body.text.length > 200) {
    return res.status(400).end();
  }

  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      {
        runValidators: true
      }
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).end();
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.params.commentId });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).end();
  }
};
