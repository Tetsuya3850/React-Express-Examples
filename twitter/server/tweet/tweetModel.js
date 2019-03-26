const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

mongoose.model("Tweet", tweetSchema);
