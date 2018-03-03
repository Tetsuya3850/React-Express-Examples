import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { logoutUser } from "../actions";
import AuthNavBar from "./AuthNavBar";
import UnAuthNavBar from "./UnAuthNavBar";

class NavBar extends Component {
  render() {
    const { isAuthed, dispatch, history, userInfo } = this.props;
    return (
      <div>
        {isAuthed ? (
          <AuthNavBar
            uid={userInfo._id}
            onLogout={() => dispatch(logoutUser(() => history.push("/")))}
          />
        ) : (
          <UnAuthNavBar />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

NavBar = connect(mapStateToProps, null)(NavBar);

export default withRouter(NavBar);
