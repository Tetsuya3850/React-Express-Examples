import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../reducer";

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(addTodo(input.value));
        input.value = "";
      }}
    >
      <input
        ref={node => {
          input = node;
        }}
        placeholder="What to get done?"
        type="text"
        autoComplete="off"
      />
      <button type="submit">Go!</button>
    </form>
  );
};

AddTodo = connect()(AddTodo);

export default AddTodo;
