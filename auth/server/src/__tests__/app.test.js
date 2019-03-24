let baseURL, api, server;
const axios = require("axios");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const mongoose = require("mongoose");
const start = require("../app");

beforeAll(() => {
  server = start();
  baseURL = `http://localhost:${server.address().port}`;
  api = axios.create({ baseURL });
});

afterAll(async () => {
  await User.deleteMany({});
  server.close();
});

const User = mongoose.model("User");

const getData = res => res.data;
const getError = error => error.response;
const getStatus = res => res.status;
const getToken = res => res.data.token;

jest.unmock("axios");

const testSignupUser = {
  name: "Tetsuya",
  email: "tetsuya@gmail.com",
  password: "Test3850"
};
const testSigninUser = _.omit(testSignupUser, "name");
const NON_EXIST_EMAIL = "nonexist@gmail.com";
const WRONG_PASSWORD = "WRONG";

test("signup: username required", async () => {
  const error = await api
    .post("/signup", _.omit(testSignupUser, "name"))
    .catch(getError);
  expect(error).toMatchObject({
    status: 400
  });
});

test("signup: email required", async () => {
  const error = await api
    .post("/signup", _.omit(testSignupUser, "email"))
    .catch(getError);
  expect(error).toMatchObject({
    status: 400
  });
});

test("signup: password required", async () => {
  const error = await api
    .post("/signup", _.omit(testSignupUser, "password"))
    .catch(getError);
  expect(error).toMatchObject({
    status: 400
  });
});

test("signup: success", async () => {
  const token = await api.post("/signup", testSignupUser).then(getData);
  const payload = jwt.decode(token);
  expect(payload).toMatchObject({
    _id: expect.any(String),
    exp: expect.any(Number)
  });
});

test("signup: email must be unique", async () => {
  const error = await api.post("/signup", testSignupUser).catch(getError);
  expect(error).toMatchObject({
    status: 400,
    data: { email: "Address already in use!" }
  });
});

test("signin: email required", async () => {
  const error = await api
    .post("/signin", _.omit(testSigninUser, "email"))
    .catch(getError);
  expect(error).toMatchObject({
    status: 400
  });
});

test("signin: password required", async () => {
  const error = await api
    .post("/signin", _.omit(testSigninUser, "password"))
    .catch(getError);
  expect(error).toMatchObject({
    status: 400
  });
});

test("signin: email must be signedup", async () => {
  const error = await api
    .post("/signin", { ...testSigninUser, email: NON_EXIST_EMAIL })
    .catch(getError);
  expect(error).toMatchObject({
    status: 401,
    data: { email: "Email not found!" }
  });
});

test("signin: password must be correct", async () => {
  const error = await api
    .post("/signin", { ...testSigninUser, password: WRONG_PASSWORD })
    .catch(getError);
  expect(error).toMatchObject({
    status: 401,
    data: { password: "Password wrong!" }
  });
});

test("signin: success", async () => {
  const token = await api.post("/signin", testSigninUser).then(getData);
  const payload = jwt.decode(token);
  expect(payload).toMatchObject({
    _id: expect.any(String),
    exp: expect.any(Number)
  });
});

test("getUser: closed for unauthed user", async () => {
  const userId = new mongoose.Types.ObjectId();
  const error = await api.get(`/users/${userId}`).catch(getError);
  expect(error).toMatchObject({
    status: 401
  });
});

test("getUser: open for authed user", async () => {
  const token = await api.post("/signin", testSigninUser).then(getData);
  const { _id } = jwt.decode(token);
  const user = await api
    .get(`/users/${_id}`, {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(getData);

  expect(user).not.toMatchObject(testSigninUser);
  expect(user).toMatchObject(_.omit(testSigninUser, "password"));
});
