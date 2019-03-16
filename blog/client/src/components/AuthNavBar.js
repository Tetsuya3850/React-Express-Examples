import React from "react";
import { NavLink } from "react-router-dom";
import { removeToken } from "../tokenUtils";

const AuthNavBar = ({ history, authedId }) => (
  <div style={styles.container}>
    <NavLink exact to="/" style={styles.leftNav} activeStyle={{ color: "red" }}>
      Home
    </NavLink>
    <NavLink
      to={`/users/${authedId}`}
      style={styles.rightNavs}
      activeStyle={{ color: "red" }}
    >
      Profile
    </NavLink>
    <div
      onClick={() => {
        removeToken();
        history.push("/");
      }}
      style={styles.rightNavs}
    >
      Logout
    </div>
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

export default AuthNavBar;
