const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  tweet: {
    type: Schema.Types.ObjectId,
    ref: "Tweet",
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

mongoose.model("Like", likeSchema);
