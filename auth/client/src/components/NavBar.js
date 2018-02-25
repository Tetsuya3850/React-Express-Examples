import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../actions";

let NavBar = ({ isAuthed, dispatch }) => {
  if (isAuthed) {
    return (
      <div style={{ display: "flex" }}>
        <NavLink to="/" style={{ flexGrow: 10 }}>
          Home
        </NavLink>
        <NavLink to="/profile" style={{ flexGrow: 1 }}>
          Profile
        </NavLink>
        <div onClick={() => dispatch(logoutUser())} style={{ flexGrow: 1 }}>
          Logout
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex" }}>
      <NavLink to="/" style={{ flexGrow: 10 }}>
        Home
      </NavLink>
      <NavLink to="/register" style={{ flexGrow: 1 }}>
        Register
      </NavLink>
      <NavLink to="/login" style={{ flexGrow: 1 }}>
        Login
      </NavLink>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

NavBar = connect(mapStateToProps, null)(NavBar);

export default NavBar;
