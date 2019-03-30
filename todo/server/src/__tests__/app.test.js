const axios = require("axios");
const mongoose = require("mongoose");
const _ = require("lodash");

const server = require("../../app");
const baseURL = `http://localhost:${server.address().port}`;
const api = axios.create({ baseURL });
const Todo = mongoose.model("Todo");

afterAll(async () => {
  await Todo.deleteMany({});
  server.close();
});

const getData = res => res.data;
const getError = error => error.response;
const getStatus = res => res.status;

jest.unmock("axios");

const testTodo = {
  text: "Swim"
};

const anotherTestTodo = {
  text: "Run"
};

describe("postTodo:", () => {
  it("text required", async () => {
    const error = await api
      .post("/todos", _.omit(testTodo, "text"))
      .catch(getError);
    expect(error).toMatchObject({
      status: 400
    });
  });

  it("Success", async () => {
    const todo = await api.post("/todos", testTodo).then(getData);
    expect(todo).toMatchObject({
      ...testTodo,
      _id: expect.any(String)
    });
  });
});

describe("getTodo:", () => {
  it("Success", async () => {
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
});

describe("deleteTodo:", () => {
  it("Error in deleting non existing todo", async () => {
    const todoId = new mongoose.Types.ObjectId();
    const error = await api.delete(`/todos/${todoId}`).catch(getError);
    expect(error).toMatchObject({
      status: 404
    });
    const todos = await api.get("/todos").then(getData);
    expect(todos).toHaveLength(2);
  });

  it("Success", async () => {
    const todos = await api.get("/todos").then(getData);
    const deleteTodo = todos[0];
    const status = await api.delete(`/todos/${deleteTodo._id}`).then(getStatus);
    expect(status).toBe(200);
    const less_todos = await api.get("/todos").then(getData);
    expect(less_todos).toEqual(expect.not.arrayContaining([deleteTodo]));
  });
});
