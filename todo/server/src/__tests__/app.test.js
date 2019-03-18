const axios = require("axios");
const _ = require("lodash");
const mongoose = require("mongoose");
const Todo = require("../todoModel");
const start = require("../app");

const getData = res => res.data;
const getError = error => error.response;
const getStatus = res => res.status;

jest.unmock("axios");

let baseURL, api, server;

const testTodo = {
  text: "Swim"
};

const anotherTestTodo = {
  text: "Run"
};

beforeAll(async () => {
  server = await start();
  baseURL = `http://localhost:${server.address().port}`;
  api = axios.create({ baseURL });
});

afterAll(() => {
  Todo.deleteMany({}, function(error) {
    console.log(error);
  });
  server.close();
});

test("todo text required to postTodo", async () => {
  const error = await api
    .post("/todos", _.omit(testTodo, "text"))
    .catch(getError);
  expect(error).toMatchObject({
    status: 400
  });
});

test("successful postTodo", async () => {
  const todo = await api.post("/todos", testTodo).then(getData);
  expect(todo).toMatchObject({
    ...testTodo,
    _id: expect.any(String)
  });
});

test("successful getTodo", async () => {
  const todos = await api.get("/todos").then(getData);
  expect(todos[0]).toMatchObject({
    ...testTodo,
    _id: expect.any(String)
  });
});

test("successful getTodo sorted by createdAt", async () => {
  await api.post("/todos", anotherTestTodo);
  const todos = await api.get("/todos").then(getData);
  expect(todos[0]).toMatchObject({
    ...anotherTestTodo,
    _id: expect.any(String)
  });
  expect(todos[1]).toMatchObject({
    ...testTodo,
    _id: expect.any(String)
  });
});

test("try to delete non existing todo", async () => {
  const todoId = new mongoose.Types.ObjectId();
  const status = await api.delete(`/todos/${todoId}`).then(getStatus);
  expect(status).toBe(200);
  const todos = await api.get("/todos").then(getData);
  expect(todos).toHaveLength(2);
});

test("successful deleteTodo", async () => {
  const todos = await api.get("/todos").then(getData);
  const todoId = todos[0]._id;
  const status = await api.delete(`/todos/${todoId}`).then(getStatus);
  expect(status).toBe(200);
  const less_todos = await api.get("/todos").then(getData);
  expect(less_todos).toHaveLength(1);
});
