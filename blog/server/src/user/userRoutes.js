const express = require("express");
const router = express.Router();
const userCtrl = require("./userController");
const { protect } = require("./jwtUtils");
const { catchErrors } = require("../errorHandlers");

router.post("/signup", userCtrl.signup);
router.post("/signin", catchErrors(userCtrl.signin));
router.get("/:userId", protect, catchErrors(userCtrl.getUser));

module.exports = router;
