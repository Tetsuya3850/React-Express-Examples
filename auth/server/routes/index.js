const jwt = require("express-jwt");
const auth = jwt({
  secret: "MY_SECRET",
  userProperty: "payload"
});

router.get("/profile", auth, ctrlProfile.profileRead);
