const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const configAuth = require("./auth");
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.use(
  new GoogleStrategy(
    {
      clientID: configAuth.googleAuth.appID,
      clientSecret: configAuth.googleAuth.appSecret,
      callbackURL: configAuth.googleAuth.callbackURL
    },
    (accessToken, refreshToken, profile, done) =>
      findUserOrCreate(profile, done)
  )
);

function findUserOrCreate(profile, done) {
  User.findOne({ email: profile.emails[0].value }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      const new_user = new User();

      new_user.name = `${profile.name.givenName} ${profile.name.familyName}`;
      new_user.email = profile.emails[0].value;
      new_user.pic = profile.photos[0].value.split("?")[0] + "?sz=70";

      new_user.save(function(err, new_user) {
        if (err) return done(err);
        return done(null, new_user);
      });
    } else {
      return done(null, user);
    }
  });
}
