import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../redux/user";
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

const mapStateToProps = ({ user }) => {
  return user;
};

NavBar = connect(mapStateToProps, null)(NavBar);

export default withRouter(NavBar);
