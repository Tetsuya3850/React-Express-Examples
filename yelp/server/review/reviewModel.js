const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.objectId,
    ref: "User",
    required: true
  },
  place: {
    type: mongoose.Schema.objectId,
    ref: "Place",
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
