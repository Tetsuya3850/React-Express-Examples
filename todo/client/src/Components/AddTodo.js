import React from "react";
import { connect } from "react-redux";
import actions from "../actions";

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(actions.addNewTodo(input.value));
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
