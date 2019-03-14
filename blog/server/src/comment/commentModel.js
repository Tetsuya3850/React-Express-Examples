const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
