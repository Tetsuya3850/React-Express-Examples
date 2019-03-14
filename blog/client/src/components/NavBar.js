import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink, withRouter } from "react-router-dom";
import { handleSignout } from "../reducers";

const NavBar = ({ uid, history, handleSignout }) =>
  uid === null ? (
    <div style={styles.container}>
      <NavLink
        exact
        to="/"
        style={styles.leftNav}
        activeStyle={{ color: "red" }}
      >
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
  ) : (
    <div style={styles.container}>
      <NavLink
        exact
        to="/"
        style={styles.leftNav}
        activeStyle={{ color: "red" }}
      >
        Home
      </NavLink>
      <NavLink
        to={`/profile`}
        style={styles.rightNavs}
        activeStyle={{ color: "red" }}
      >
        Profile
      </NavLink>
      <div
        onClick={() => handleSignout(() => history.push("/"))}
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

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleSignout }, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
);
