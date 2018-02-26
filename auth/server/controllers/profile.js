var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports.secret = function(req, res) {
  if (req.payload._id !== req.params.uid) {
    res.status(401).json({
      code: "You are spoofing!"
    });
  } else {
    res.status(200).json({
      code: "I love you!"
    });
  }
};
