import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../reducer";

let Search = ({ handleFetchListItems, handleFetchListSearch }) => (
  <form
    style={{ textAlign: "center", display: "flex" }}
    onSubmit={e => {
      e.preventDefault();
      if (this.input.value === "") {
        handleFetchListItems();
        return;
      }
      handleFetchListSearch(this.input.value);
    }}
  >
    <input
      style={{
        flexGrow: 10,
        height: "20px",
        fontSize: "10pt"
      }}
      ref={node => {
        this.input = node;
      }}
      maxLength={25}
      placeholder="Search"
      type="text"
      autoFocus
    />
    <button
      type="submit"
      style={{
        flexGrow: 1
      }}
    >
      <i className="fa fa-search" aria-hidden="true" />
    </button>
  </form>
);

export default Search;
