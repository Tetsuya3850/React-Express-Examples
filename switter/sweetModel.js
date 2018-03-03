const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const sweetSchema = new mongoose.Schema({
  text: {
    type: String,
    maxlength: [140, "Too Long!"],
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  liked: Boolean,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  replies: [sweetSchema]
});

mongoose.model("Sweet", sweetSchema);
