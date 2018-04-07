const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const jwt = require("express-jwt");
const auth = jwt({
  secret: jwt_secret,
  requestProperty: "me"
});

const usersCtrl = require("./usersController");
const itemsCtrl = require("./itemsController");

router.get("/auth/google", usersCtrl.goAuth);
router.get("/auth/google/callback", usersCtrl.goAuthCB);
router.get("/users/history/:uid", usersCtrl.getHistory);
router.post("/users/additem", usersCtrl.addItem);
router.post("/users/editnum", usersCtrl.editNum);
router.post("/users/deleteitem", usersCtrl.deleteItem);
router.post("/users/order", usersCtrl.order);

router.get("/items/category", itemsCtrl.getCategory);
router.get("/items/search", itemsCtrl.getSearch);
router.get("/items/:itemid", itemsCtrl.getProduct);
router.post("/items/:itemid/addreview", itemsCtrl.addReview);

module.exports = router;
