var express = require("express");
var router = express.Router();
const commentCtrl = require("./commentController");

router.get("/post/:postId", commentCtrl.getCommnetByPost);
router.post("/", commentCtrl.postComment);
router.put("/:commentId", commentCtrl.editComment);
router.delete("/:commentId", commentCtrl.deleteComment);

module.exports = router;
