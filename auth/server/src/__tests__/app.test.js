const axios = require("axios");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { User } = require("../userModel");
const start = require("../app");

const getData = res => res.data;
const getError = error => error.response;
const getToken = res => res.data.token;

jest.unmock("axios");

let baseURL, api, server;

const testSignupUser = {
  name: "Tetsuya",
  email: "tetsuya@gmail.com",
  password: "Test3850"
};
const testSigninUser = _.omit(testSignupUser, "name");
const NON_EXIST_EMAIL = "nonexist@gmail.com";
const WRONG_PASSWORD = "WRONG";

beforeAll(async () => {
  server = await start();
  baseURL = `http://localhost:${server.address().port}`;
  api = axios.create({ baseURL });
});

afterAll(() => {
  User.deleteMany({}, function(error) {
    console.log(error);
  });
  server.close();
});

test("username required to signup", async () => {
  const error = await api
    .post("/signup", _.omit(testSignupUser, "name"))
    .catch(getError);
  expect(error).toMatchObject({
    status: 400
  });
});

test("email required to signup", async () => {
  const error = await api
    .post("/signup", _.omit(testSignupUser, "email"))
    .catch(getError);
  expect(error).toMatchObject({
    status: 400
  });
});

test("password required to signup", async () => {
  const error = await api
    .post("/signup", _.omit(testSignupUser, "password"))
    .catch(getError);
  expect(error).toMatchObject({
    status: 400
  });
});

test("successful signup", async () => {
  const token = await api.post("/signup", testSignupUser).then(getToken);
  const payload = jwt.decode(token);
  expect(payload).toMatchObject({
    _id: expect.any(String),
    exp: expect.any(Number)
  });
});

test("email must be unique to signup", async () => {
  const error = await api.post("/signup", testSignupUser).catch(getError);
  expect(error).toMatchObject({
    status: 400,
    data: { email: "Duplicate email!" }
  });
});

test("email required to signin", async () => {
  const error = await api
    .post("/signin", _.omit(testSigninUser, "email"))
    .catch(getError);
  expect(error).toMatchObject({
    status: 400
  });
});

test("password required to signin", async () => {
  const error = await api
    .post("/signin", _.omit(testSigninUser, "password"))
    .catch(getError);
  expect(error).toMatchObject({
    status: 400
  });
});

test("user must exist to signin", async () => {
  const error = await api
    .post("/signin", { ...testSigninUser, email: NON_EXIST_EMAIL })
    .catch(getError);
  expect(error).toMatchObject({
    status: 401,
    data: { email: "Email not found!" }
  });
});

test("password must be correct to signin", async () => {
  const error = await api
    .post("/signin", { ...testSigninUser, password: WRONG_PASSWORD })
    .catch(getError);
  expect(error).toMatchObject({
    status: 401,
    data: { password: "Password wrong!" }
  });
});

test("successful signin", async () => {
  const token = await api.post("/signin", testSigninUser).then(getToken);
  const payload = jwt.decode(token);
  expect(payload).toMatchObject({
    _id: expect.any(String),
    exp: expect.any(Number)
  });
});

test("getUser locked down for unauthed sources", async () => {
  const error = await api.get("/users").catch(getError);
  expect(error).toMatchObject({
    status: 401
  });
});

test("getUser not locked down for authed sources", async () => {
  const token = await api.post("/signin", testSigninUser).then(getToken);
  const user = await api
    .get("/users", {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(getData);

  expect(user).toMatchObject(_.omit(testSigninUser, "password"));
});
