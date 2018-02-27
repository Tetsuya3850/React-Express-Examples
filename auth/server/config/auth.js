require("dotenv").config();
const FB_APP_ID = process.env.FB_APP_ID;
const FB_SECRET = process.env.FB_SECRET;
const GO_APP_ID = process.env.GO_APP_ID;
const GO_SECRET = process.env.GO_SECRET;

module.exports = {
  facebookAuth: {
    appID: FB_APP_ID,
    appSecret: FB_SECRET,
    callbackURL: "http://localhost:5150/auth/facebook/callback"
  },
  googleAuth: {
    appID: GO_APP_ID,
    appSecret: GO_SECRET,
    callbackURL: "http://localhost:5150/auth/google/callback"
  }
};
