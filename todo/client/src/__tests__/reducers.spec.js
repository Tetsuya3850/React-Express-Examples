import appReducer, {
  fetchTodos,
  fetchTodosSuccess,
  fetchTodosError,
  addTodo,
  addTodoError,
  deleteTodo,
  deleteTodoError,
  handleFetchTodos,
  handleAddTodo,
  handleDeleteTodo
} from "../reducers";
import moxios from "moxios";

test("action creator fetch todos", () => {
  expect(fetchTodos()).toMatchSnapshot();
});

test("action creator fetch todos success", () => {
  expect(
    fetchTodosSuccess([
      {
        _id: "5c6a50587fb33895385d3b7f",
        task: "test2",
        createdAt: "2019-02-18T06:27:36.452Z",
        __v: 0
      },
      {
        _id: "5c6a50557fb33895385d3b7e",
        task: "test1",
        createdAt: "2019-02-18T06:27:33.861Z",
        __v: 0
      }
    ])
  ).toMatchSnapshot();
});

test("action creator fetch todos error", () => {
  expect(fetchTodosError()).toMatchSnapshot();
});

test("action creator add todo", () => {
  expect(addTodo()).toMatchSnapshot();
});

test("action creator add todo error", () => {
  expect(
    addTodoError({
      _id: "5c6a50807fb33895385d3b80",
      task: "test3",
      createdAt: "2019-02-18T06:28:16.078Z",
      __v: 0
    })
  ).toMatchSnapshot();
});

test("action creator delete todo", () => {
  expect(deleteTodo("5c6a50807fb33895385d3b80")).toMatchSnapshot();
});

test("action creator delete todo error", () => {
  expect(deleteTodoError()).toMatchSnapshot();
});

const todos = [
  {
    _id: "5c6a50587fb33895385d3b7f",
    task: "test2",
    createdAt: "2019-02-18T06:27:36.452Z",
    __v: 0
  },
  {
    _id: "5c6a50557fb33895385d3b7e",
    task: "test1",
    createdAt: "2019-02-18T06:27:33.861Z",
    __v: 0
  }
];

test("thunk handle fetch todos", done => {
  const dispatchMock = jest.fn();
  moxios.withMock(() => {
    handleFetchTodos()(dispatchMock);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: todos }).then(() => {
        expect(request.url).toEqual(
          `https://todo-server-3850.herokuapp.com/todos`
        );
        expect(dispatchMock).toBeCalledWith(fetchTodos());
        expect(dispatchMock).toBeCalledWith(fetchTodosSuccess(todos));
        done();
      });
    });
  });
});

const newTodo = {
  _id: "5c6a50807fb33895385d3b80",
  task: "test3",
  createdAt: "2019-02-18T06:28:16.078Z",
  __v: 0
};

test("thunk handle add todo", done => {
  const dispatchMock = jest.fn();
  moxios.withMock(() => {
    handleAddTodo()(dispatchMock);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: newTodo }).then(() => {
        expect(request.url).toEqual(
          `https://todo-server-3850.herokuapp.com/todos`
        );
        expect(dispatchMock).toBeCalledWith(addTodo(newTodo));
        done();
      });
    });
  });
});

const deleteId = "5c6a50807fb33895385d3b80";

test("thunk handle delete todo", done => {
  const dispatchMock = jest.fn();
  moxios.withMock(() => {
    handleDeleteTodo(deleteId)(dispatchMock);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200 }).then(() => {
        expect(request.url).toEqual(
          `https://todo-server-3850.herokuapp.com/todos/${deleteId}`
        );
        expect(dispatchMock).toBeCalledWith(deleteTodo(deleteId));
        done();
      });
    });
  });
});

test("reducer fetch todos", () => {
  let state;
  state = appReducer(
    { isFetching: false, error: "", todos: [] },
    { type: "FETCH_TODOS" }
  );
  expect(state).toEqual({ isFetching: true, error: "", todos: [] });
});

test("reducer fetch todos error", () => {
  let state;
  state = appReducer(
    { isFetching: true, error: "", todos: [] },
    { type: "FETCH_TODOS_ERROR", error: "Something went wrong!" }
  );
  expect(state).toEqual({
    isFetching: false,
    error: "Something went wrong!",
    todos: []
  });
});

test("reducer fetch todos success", () => {
  let state;
  state = appReducer(
    { isFetching: true, error: "", todos: [] },
    {
      type: "FETCH_TODOS_SUCCESS",
      payload: [
        {
          _id: "5c6a50587fb33895385d3b7f",
          task: "test2",
          createdAt: "2019-02-18T06:27:36.452Z",
          __v: 0
        },
        {
          _id: "5c6a50557fb33895385d3b7e",
          task: "test1",
          createdAt: "2019-02-18T06:27:33.861Z",
          __v: 0
        }
      ]
    }
  );
  expect(state).toEqual({
    isFetching: false,
    error: "",
    todos: [
      {
        _id: "5c6a50587fb33895385d3b7f",
        task: "test2",
        createdAt: "2019-02-18T06:27:36.452Z",
        __v: 0
      },
      {
        _id: "5c6a50557fb33895385d3b7e",
        task: "test1",
        createdAt: "2019-02-18T06:27:33.861Z",
        __v: 0
      }
    ]
  });
});

test("reducer add todo", () => {
  let state;
  state = appReducer(
    {
      isFetching: false,
      error: "",
      todos: [
        {
          _id: "5c6a50587fb33895385d3b7f",
          task: "test2",
          createdAt: "2019-02-18T06:27:36.452Z",
          __v: 0
        },
        {
          _id: "5c6a50557fb33895385d3b7e",
          task: "test1",
          createdAt: "2019-02-18T06:27:33.861Z",
          __v: 0
        }
      ]
    },
    {
      type: "ADD_TODO",
      payload: {
        _id: "5c6a50807fb33895385d3b80",
        task: "test3",
        createdAt: "2019-02-18T06:28:16.078Z",
        __v: 0
      }
    }
  );
  expect(state).toEqual({
    isFetching: false,
    error: "",
    todos: [
      {
        _id: "5c6a50807fb33895385d3b80",
        task: "test3",
        createdAt: "2019-02-18T06:28:16.078Z",
        __v: 0
      },
      {
        _id: "5c6a50587fb33895385d3b7f",
        task: "test2",
        createdAt: "2019-02-18T06:27:36.452Z",
        __v: 0
      },
      {
        _id: "5c6a50557fb33895385d3b7e",
        task: "test1",
        createdAt: "2019-02-18T06:27:33.861Z",
        __v: 0
      }
    ]
  });
});

test("reducer add todo error", () => {
  let state;
  state = appReducer(
    {
      isFetching: false,
      error: "",
      todos: [
        {
          _id: "5c6a50587fb33895385d3b7f",
          task: "test2",
          createdAt: "2019-02-18T06:27:36.452Z",
          __v: 0
        },
        {
          _id: "5c6a50557fb33895385d3b7e",
          task: "test1",
          createdAt: "2019-02-18T06:27:33.861Z",
          __v: 0
        }
      ]
    },
    { type: "ADD_TODO_ERROR", error: "Something went wrong!" }
  );
  expect(state).toEqual({
    isFetching: false,
    error: "Something went wrong!",
    todos: [
      {
        _id: "5c6a50587fb33895385d3b7f",
        task: "test2",
        createdAt: "2019-02-18T06:27:36.452Z",
        __v: 0
      },
      {
        _id: "5c6a50557fb33895385d3b7e",
        task: "test1",
        createdAt: "2019-02-18T06:27:33.861Z",
        __v: 0
      }
    ]
  });
});

test("reducer delete todo", () => {
  let state;
  state = appReducer(
    {
      isFetching: false,
      error: "",
      todos: [
        {
          _id: "5c6a50807fb33895385d3b80",
          task: "test3",
          createdAt: "2019-02-18T06:28:16.078Z",
          __v: 0
        },
        {
          _id: "5c6a50587fb33895385d3b7f",
          task: "test2",
          createdAt: "2019-02-18T06:27:36.452Z",
          __v: 0
        },
        {
          _id: "5c6a50557fb33895385d3b7e",
          task: "test1",
          createdAt: "2019-02-18T06:27:33.861Z",
          __v: 0
        }
      ]
    },
    { type: "DELETE_TODO", payload: "5c6a50807fb33895385d3b80" }
  );
  expect(state).toEqual({
    isFetching: false,
    error: "",
    todos: [
      {
        _id: "5c6a50587fb33895385d3b7f",
        task: "test2",
        createdAt: "2019-02-18T06:27:36.452Z",
        __v: 0
      },
      {
        _id: "5c6a50557fb33895385d3b7e",
        task: "test1",
        createdAt: "2019-02-18T06:27:33.861Z",
        __v: 0
      }
    ]
  });
});

test("reducer delete todo error", () => {
  let state;
  state = appReducer(
    {
      isFetching: false,
      error: "Something went wrong!",
      todos: [
        {
          _id: "5c6a50587fb33895385d3b7f",
          task: "test2",
          createdAt: "2019-02-18T06:27:36.452Z",
          __v: 0
        },
        {
          _id: "5c6a50557fb33895385d3b7e",
          task: "test1",
          createdAt: "2019-02-18T06:27:33.861Z",
          __v: 0
        }
      ]
    },
    { type: "DELETE_TODO_ERROR", error: "Something went wrong!" }
  );
  expect(state).toEqual({
    isFetching: false,
    error: "Something went wrong!",
    todos: [
      {
        _id: "5c6a50587fb33895385d3b7f",
        task: "test2",
        createdAt: "2019-02-18T06:27:36.452Z",
        __v: 0
      },
      {
        _id: "5c6a50557fb33895385d3b7e",
        task: "test1",
        createdAt: "2019-02-18T06:27:33.861Z",
        __v: 0
      }
    ]
  });
});
