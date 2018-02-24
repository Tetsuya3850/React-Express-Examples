import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Home from "./Home";
import { getToken } from "../helper";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutRedirect: false
    };
  }

  componentDidMount() {
    this.reAuth();
  }

  reAuth = () => {
    const userInfo = this.getUserInfo();
    if (userInfo && userInfo.exp > Date.now() / 1000) {
      this.setState({ user: userInfo });
    }
  };

  getUserInfo = () => {
    const token = getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  };

  handleLogout = () => {
    this.token = "";
    window.localStorage.removeItem("jwt-token");
    this.setState({ logoutRedirect: true });
  };

  render() {
    if (this.state.logoutRedirect) {
      return <Redirect to={Home} />;
    }

    const navBar = this.state.user ? (
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

export default AppContainer;
