const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB =
  process.env.NODE_ENV !== "test"
    ? process.env.MONGODB
    : process.env.MONGODBTEST;

const connectDB = () => {
  mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true });
  mongoose.connection.on("error", err => {
    console.error(err.message);
  });
};

module.exports = connectDB;
