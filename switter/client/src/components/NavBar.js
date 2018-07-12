import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../reducer/users";
import AuthNavBar from "./AuthNavBar";
import UnAuthNavBar from "./UnAuthNavBar";

class NavBar extends Component {
  render() {
    const { isAuthed, ownInfo, logoutUser, history } = this.props;
    return (
      <div>
        {isAuthed ? (
          <AuthNavBar
            uid={ownInfo._id}
            onLogout={() => logoutUser(() => history.push("/"))}
          />
        ) : (
          <UnAuthNavBar />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return users;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logoutUser
    },
    dispatch
  );
};

NavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default withRouter(NavBar);
