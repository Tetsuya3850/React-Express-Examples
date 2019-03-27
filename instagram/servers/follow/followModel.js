const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = new Schema({
  follow: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

mongoose.model("Follow", followSchema);
