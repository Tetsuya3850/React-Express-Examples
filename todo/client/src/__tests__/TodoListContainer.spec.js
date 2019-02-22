import React from "react";
import ReactDOM from "react-dom";
import { UnwrappedTodoListContainer } from "../components/TodoListContainer";

test("TodoListContainer renders LOADING during fetching", () => {
  const container = document.createElement("div");
  ReactDOM.render(
    <UnwrappedTodoListContainer
      isFetching={true}
      handleFetchTodos={() => {}}
    />,
    container
  );
  expect(container.textContent).toMatch("LOADING");
});
