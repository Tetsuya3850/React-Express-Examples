import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { reAuthUser } from "../actions";
import NavBar from "./NavBar";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";

class AppContainer extends Component {
  componentWillMount() {
    this.props.dispatch(reAuthUser());
  }

  render() {
    return (
      <Router>
        <div style={{ margin: "auto", width: 400 }}>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
        </div>
      </Router>
    );
  }
}

AppContainer = connect()(AppContainer);

export default AppContainer;
