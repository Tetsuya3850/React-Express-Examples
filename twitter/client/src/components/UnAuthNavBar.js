import React from "react";
import { NavLink } from "react-router-dom";

const UnAuthNavBar = () => (
  <div>
    <div style={{ display: "flex" }}>
      <NavLink
        exact
        to="/"
        style={{ flexGrow: 10 }}
        activeStyle={{ color: "red" }}
      >
        Home
      </NavLink>
      <NavLink
        to="/auth"
        style={{ flexGrow: 1 }}
        activeStyle={{ color: "red" }}
      >
        Sign In
      </NavLink>
    </div>
    <hr />
  </div>
);

export default UnAuthNavBar;
