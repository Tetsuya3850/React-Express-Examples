const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  tags: [String],
  category_id: {
    type: Schema.objectId,
    ref: Category
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  thumbnail: [mongoose.Schema.Types.ObjectId],
  likes: Number,
  dislikes: Number,
  views: Number
});
