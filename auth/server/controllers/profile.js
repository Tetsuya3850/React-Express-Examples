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

module.exports.addPushNotificationId = async (req, res) => {
  const { uid, token } = req.body;
  try {
    await User.findByIdAndUpdate(uid, { $set: { pushTokenId: token } });
    res.json("success!");
  } catch (e) {
    res.json(e);
  }
};

module.exports.sendPushNotifications = (req, res) => {
  const somePushTokens = ["ExponentPushToken[ZkmuQHAXHp1_mt-mqRDaYh]"];
  let messages = [];
  const { title, body } = req.body;

  for (let pushToken of somePushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    messages.push({
      to: pushToken,
      sound: "default",
      title,
      body,
      data: { title, body }
    });
  }
  let chunks = expo.chunkPushNotifications(messages);

  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
  res.json("success!");
};
