import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { reAuthUser, logoutUser } from "../redux/users";
import AuthNavBar from "./AuthNavBar";
import UnAuthNavBar from "./UnAuthNavBar";

class NavBar extends Component {
  componentWillMount() {
    const { reAuthUser, history } = this.props;
    reAuthUser(() => history.push("/auth"));
  }

  render() {
    const { users, logoutUser, history } = this.props;
    return (
      <div>
        {users.isAuthed ? (
          <AuthNavBar
            uid={users.ownInfo._id}
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
  return { users };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      reAuthUser,
      logoutUser
    },
    dispatch
  );
};

NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default withRouter(NavBar);
