const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  star: Number,
  title: {
    type: String,
    required: [true, "Empty!"],
    maxlength: [50, "Too Long!"]
  },
  content: {
    type: String,
    required: [true, "Empty!"],
    maxlength: [300, "Too Long!"]
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

const itemSchema = new mongoose.Schema({
  name: String,
  maker: String,
  pic: String,
  cost: Number,
  detail: String,
  category: String,
  stock: Number,
  reviews: [reviewSchema]
});

mongoose.model("Item", itemSchema);
