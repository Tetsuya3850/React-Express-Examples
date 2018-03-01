const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.post("/inquiry", (req, res) => {
  res.json("Thank You!");
});

app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
