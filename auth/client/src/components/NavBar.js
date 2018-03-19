import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { logoutUser } from "../reducer";

let NavBar = ({ isAuthed, dispatch, history, userInfo }) => {
  if (isAuthed) {
    return (
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
          to={`/profile/${userInfo._id}`}
          style={{ flexGrow: 1 }}
          activeStyle={{ color: "red" }}
        >
          Profile
        </NavLink>
        <div
          onClick={() => dispatch(logoutUser(() => history.push("/")))}
          style={{ flexGrow: 1 }}
        >
          Logout
        </div>
      </div>
    );
  }
  return (
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
        to="/register"
        style={{ flexGrow: 1 }}
        activeStyle={{ color: "red" }}
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        style={{ flexGrow: 1 }}
        activeStyle={{ color: "red" }}
      >
        Login
      </NavLink>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

NavBar = connect(mapStateToProps, null)(NavBar);

export default withRouter(NavBar);
