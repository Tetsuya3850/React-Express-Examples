const Article = require("./articleModel");

module.exports.postArticle = async (req, res) => {
  if (!req.body.title || !req.body.text) {
    return res.status(400).end();
  }

  try {
    await Article.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).end();
  }
};

module.exports.getFeed = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("author", { password: 0 })
      .sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).end();
  }
};

module.exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId).populate(
      "author",
      { password: 0 }
    );
    res.status(200).json(article);
  } catch (error) {
    res.status(500).end();
  }
};

module.exports.getUserFeed = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.params.userId }).populate(
      "author",
      { password: 0 }
    );
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).end();
  }
};

module.exports.editArticle = async (req, res) => {
  if (!req.body.title || !req.body.text) {
    return res.status(400).end();
  }

  try {
    await Article.findOneAndUpdate({ _id: req.body._id }, req.body, {
      runValidators: true
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).end();
  }
};

module.exports.deleteArticle = async (req, res) => {
  try {
    await Article.deleteOne({ _id: req.params.articleId });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).end();
  }
};
