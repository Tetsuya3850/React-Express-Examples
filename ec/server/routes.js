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
router.get("/users/reviewed", auth, usersCtrl.getReviewed);
router.get("/users/cart", auth, usersCtrl.getCart);
router.get("/users/history", auth, usersCtrl.getHistory);
router.post("/users/additem", auth, usersCtrl.addItem);
router.post("/users/editnum", auth, usersCtrl.editNum);
router.post("/users/deleteitem", auth, usersCtrl.deleteItem);
router.post("/users/order", auth, usersCtrl.order);

router.get("/items/all", itemsCtrl.getAll);
router.get("/items/category/:key", itemsCtrl.getCategory);
router.get("/items/search/:query", itemsCtrl.getSearch);
router.get("/items/details/:itemid", itemsCtrl.getItem);
router.post("/items/:itemId/addreview", auth, itemsCtrl.addReview);

module.exports = router;
