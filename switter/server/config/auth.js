require("dotenv").config();
const GO_APP_ID = process.env.GO_APP_ID;
const GO_SECRET = process.env.GO_SECRET;

module.exports = {
  googleAuth: {
    appID: GO_APP_ID,
    appSecret: GO_SECRET,
    callbackURL: "https://switter-server-3850/auth/google/callback"
  }
};
