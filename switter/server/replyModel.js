const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const replySchema = new mongoose.Schema({
  text: {
    type: String,
    maxlength: [140, "Too Long!"],
    trim: true
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

mongoose.model("Reply", replySchema);
