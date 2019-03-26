exports.likeTweet = async (req, res) => {
  const likes = req.user.hearts.map(obj => obj.toString());
  const operator = likes.includes(req.params.id) ? "$pull" : "$addToSet";
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { [operator]: { likes: req.params.id } },
    { new: true }
  );
  res.status(200).end();
};
