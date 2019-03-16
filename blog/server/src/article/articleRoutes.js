var express = require("express");
var router = express.Router();
const articleCtrl = require("./articleController");

router.get("/", articleCtrl.getArticles);
router.get("/:articleId", articleCtrl.getArticle);
router.get("/users/:userId", articleCtrl.getArticlesByUser);
router.post("/", articleCtrl.postArticle);
router.put("/:articleId", articleCtrl.editArticle);
router.delete("/:articleId", articleCtrl.deleteArticle);

module.exports = router;
