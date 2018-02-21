const express = require("express");
const app = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();
const port = process.env.PORT;
const mongoDB = process.env.MONGODB;

const validateEmail = email => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const responseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Required!"],
    maxlength: [100, "Too Long!"]
  },
  email: {
    type: String,
    required: [true, "Required!"],
    validate: [validateEmail, "Invalid address!"],
    maxlength: [100, "Too Long!"],
    unique: true
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "Invalid Choice!"
    },
    required: [true, "Required!"]
  },
  colors: {
    type: [
      {
        type: String,
        required: [true, "Required!"],
        enum: { values: ["red", "green", "blue"], message: "Invalid Choice!" }
      }
    ]
  },
  comments: {
    type: String,
    maxlength: [1000, "Too Long!"]
  }
});
const Response = mongoose.model("Response", responseSchema);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/response", async (req, res) => {
  const responses = await Response.find();
  res.json(responses);
});

app.post("/add", async (req, res, next) => {
  const newResponse = new Response(req.body);
  try {
    await newResponse.save();
    res.json("Response Added!");
  } catch (err) {
    return next(err);
  }
});

app.use((err, request, response, next) => {
  console.log(err);
  response.send(err);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  mongoose.connect(mongoDB);
});
