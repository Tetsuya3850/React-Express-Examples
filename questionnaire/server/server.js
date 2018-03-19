const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();
const port = process.env.PORT;
const mongoDB = process.env.MONGODB;

mongoose.connect(mongoDB);
mongoose.connection.on("error", err => {
  console.error(err.message);
});

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
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/add", async (req, res, next) => {
  const newResponse = new Response(req.body);
  try {
    await newResponse.save();
    res.status(200).json("Response Added!");
  } catch (e) {
    res.status(500).json(e);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json(err);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
