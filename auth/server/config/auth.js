require("dotenv").config();
const FB_APP_ID = process.env.FB_APP_ID;
const FB_SECRET = process.env.FB_SECRET;

module.exports = {
  facebookAuth: {
    appID: FB_APP_ID,
    appSecret: FB_SECRET,
    callbackURL: "http://localhost:5150/auth/facebook/callback"
  }
};
