import React from "react";
import ReactDOM from "react-dom";
import Todo from "../components/Todo";

test("Todo renders the task", () => {
  const container = document.createElement("div");
  ReactDOM.render(<Todo task={"Run"} />, container);
  expect(container.textContent).toMatch("Run");
});
