const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports.register = function(req, res) {
  const user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    const token = user.generateJwt();
    res.status(200);
    res.json({
      user: user,
      token: token
    });
  });
};

module.exports.login = function(req, res) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      res.status(404).json(err);
      return;
    }

    if (user) {
      const token = user.generateJwt();
      res.status(200);
      res.json({
        token: token
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};
