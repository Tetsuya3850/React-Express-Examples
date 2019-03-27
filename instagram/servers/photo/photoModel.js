const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  photoPath: {
    type: String
  },
  createdAt: {
    type: String
  }
});

mongoose.model("Photo", photoSchema);
