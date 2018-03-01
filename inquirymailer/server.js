const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();
const port = process.env.PORT;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tetsuya.chicago@gmail.com",
    pass: "j445lhOoeNJ9"
  }
});

app.post("/inquiry", (req, res, next) => {
  const inquiryMailOptions = {
    from: "tetsuya.chicago@gmail.com",
    to: "tetsuya.chicago@gmail.com",
    subject: req.body.subject,
    text: req.body.text
  };

  transporter.sendMail(inquiryMailOptions, function(error, info) {
    if (error) {
      next(err);
    }
  });

  confirmMailOptions = {
    from: "tetsuya.chicago@gmail.com",
    to: req.body.email,
    subject: "Thank you for your inquiry!",
    text: "Your inquiry will be answered soon."
  };

  transporter.sendMail(confirmMailOptions, function(error, info) {
    if (error) {
      next(error);
    } else {
      res.json("success");
    }
  });
});

app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
