import React from "react";
import { NavLink } from "react-router-dom";

const UnAuthNavBar = () => (
  <div style={styles.container}>
    <NavLink exact to="/" style={styles.leftNav} activeStyle={{ color: "red" }}>
      Home
    </NavLink>
    <NavLink
      to="/signup"
      style={styles.rightNavs}
      activeStyle={{ color: "red" }}
    >
      Signup
    </NavLink>
    <NavLink
      to="/signin"
      style={styles.rightNavs}
      activeStyle={{ color: "red" }}
    >
      Signin
    </NavLink>
  </div>
);

const styles = {
  container: {
    display: "flex"
  },
  leftNav: {
    flexGrow: 10
  },
  rightNavs: {
    flexGrow: 1
  }
};

export default UnAuthNavBar;
