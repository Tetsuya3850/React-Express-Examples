const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 3001;
const mongoDB =
  process.env.NODE_ENV !== "test"
    ? process.env.MONGODB
    : process.env.MONGODBTEST;
const { protect } = require("./userModel");
const userCtrl = require("./userController");

const start = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.post("/signup", userCtrl.signup);
  app.post("/signin", userCtrl.signin);
  app.get("/users/:userId", protect, userCtrl.getUser);

  return new Promise(resolve => {
    mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true });
    mongoose.connection.on("error", err => {
      console.error(err.message);
    });

    const server = app.listen(port, () => {
      const originalClose = server.close.bind(server);
      server.close = () => {
        return new Promise(resolveClose => {
          originalClose(resolveClose);
        });
      };
      resolve(server);
    });
  });
};

module.exports = start;
