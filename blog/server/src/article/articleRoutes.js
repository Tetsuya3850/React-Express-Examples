const express = require("express");
const router = express.Router();
const articleCtrl = require("./articleController");

router.post("/", articleCtrl.postArticle);
router.get("/", articleCtrl.getFeed);
router.get("/:articleId", articleCtrl.getArticle);
router.get("/users/:userId", articleCtrl.getUserArticles);
router.put("/:articleId", articleCtrl.editArticle);
router.delete("/:articleId", articleCtrl.deleteArticle);

module.exports = router;
