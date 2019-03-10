const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8081;
const connectDB = require("./connectDB");
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
  app.get("/users", protect, userCtrl.getUser);

  return new Promise(resolve => {
    try {
      connectDB();
      const server = app.listen(port, () => {
        const originalClose = server.close.bind(server);
        server.close = () => {
          return new Promise(resolveClose => {
            originalClose(resolveClose);
          });
        };
        resolve(server);
      });
    } catch (error) {
      console.error(error);
    }
  });
};

module.exports = start;
