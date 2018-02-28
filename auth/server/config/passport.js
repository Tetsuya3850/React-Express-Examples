const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const configAuth = require("./auth");
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    function(username, password, done) {
      User.findOne({ email: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            email: "Email not found"
          });
        }
        if (!user.validPassword(password)) {
          return done(null, false, {
            password: "Password is wrong"
          });
        }
        return done(null, user);
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: configAuth.facebookAuth.appID,
      clientSecret: configAuth.facebookAuth.appSecret,
      callbackURL: configAuth.facebookAuth.callbackURL,
      profileFields: ["id", "emails", "name"]
    },
    (accessToken, refreshToken, profile, done) =>
      findUserOrCreate(profile, done)
  )
);

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

      new_user.save(function(err, new_user) {
        if (err) return done(err);
        return done(null, new_user);
      });
    } else {
      return done(null, user);
    }
  });
}
