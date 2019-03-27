const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({});

mongoose.model("User", userSchema);
