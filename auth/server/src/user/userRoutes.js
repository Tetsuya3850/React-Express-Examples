const express = require("express");
const router = express.Router();
const userCtrl = require("./userController");
const { catchErrors } = require("../utils/errorHandlers");
const { protect } = require("./jwtUtils");

router.post("/signup", userCtrl.signup);
router.post("/signin", catchErrors(userCtrl.signin));
router.get("/:userId", protect, catchErrors(userCtrl.getUser));

module.exports = router;
