const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
