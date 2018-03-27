import React from "react";
import { NavLink } from "react-router-dom";
import SweetModal from "./SweetModal";

const AuthNavBar = ({ uid, onLogout }) => (
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
        to={`/profile/${uid}`}
        style={{ flexGrow: 1 }}
        activeStyle={{ color: "red" }}
      >
        Profile
      </NavLink>
      <div onClick={onLogout} style={{ flexGrow: 1 }}>
        Logout
      </div>
      <SweetModal />
    </div>
    <hr />
  </div>
);

export default AuthNavBar;
