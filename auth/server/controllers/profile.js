var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports.secret = function(req, res) {
  res.status(200).json({
    code: "I love you!"
  });
};
