const Article = require("./articleModel");

module.exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("author")
      .sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).end();
  }
};

module.exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId).populate(
      "author"
    );
    res.status(200).json(article);
  } catch (error) {
    res.status(500).end();
  }
};

module.exports.getArticlesByUser = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.params.userId }).populate(
      "author"
    );
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).end();
  }
};

module.exports.postArticle = async (req, res) => {
  if (
    !req.body.title ||
    req.body.text.title > 50 ||
    !req.body.text ||
    req.body.text.length > 1000
  ) {
    return res.status(400).end();
  }

  try {
    const article = await Article.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).end();
  }
};

module.exports.editArticle = async (req, res) => {
  if (
    !req.body.title ||
    req.body.text.title > 50 ||
    !req.body.text ||
    req.body.text.length > 1000
  ) {
    return res.status(400).end();
  }

  try {
    const article = await Article.findByIdAndUpdate(req.body._id, req.body, {
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
