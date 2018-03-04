const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    maxlength: [140, "Too Long!"]
  },
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }
});

const sweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Empty Sweet!"],
    maxlength: [140, "Too Long!"]
  },
  created: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  comments: [commentSchema]
});

mongoose.model("Sweet", sweetSchema);
