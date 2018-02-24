import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import actions from "../actions";

class AppContainer extends Component {
  componentWillMount() {
    this.reAuth();
  }

  reAuth = () => {
    this.props.dispatch(actions.reAuthUser());
  };

  handleLogout = () => {
    this.props.dispatch(actions.logoutUser());
  };

  render() {
    const navBar = this.props.isAuthed ? (
      <div style={{ display: "flex" }}>
        <Link to="/" style={{ flexGrow: 10 }}>
          Home
        </Link>
        <Link to="/profile" style={{ flexGrow: 1 }}>
          Profile
        </Link>
        <div onClick={this.handleLogout} style={{ flexGrow: 1 }}>
          Logout
        </div>
      </div>
    ) : (
      <div style={{ display: "flex" }}>
        <Link to="/" style={{ flexGrow: 10 }}>
          Home
        </Link>
        <Link to="/register" style={{ flexGrow: 1 }}>
          Register
        </Link>
        <Link to="/login" style={{ flexGrow: 1 }}>
          Login
        </Link>
      </div>
    );

    return (
      <div style={{ margin: "auto", width: 400 }}>
        {navBar}
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

AppContainer = connect(mapStateToProps, null)(AppContainer);

export default AppContainer;
