import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../redux/users";
import AuthNavBar from "./AuthNavBar";
import UnAuthNavBar from "./UnAuthNavBar";

class NavBar extends Component {
  render() {
    const { users, dispatch, history } = this.props;
    return (
      <div>
        {users.isAuthed ? (
          <AuthNavBar
            uid={users.ownInfo._id}
            onLogout={() => dispatch(logoutUser(() => history.push("/")))}
          />
        ) : (
          <UnAuthNavBar />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return { users };
};

NavBar = connect(mapStateToProps, null)(NavBar);

export default withRouter(NavBar);
