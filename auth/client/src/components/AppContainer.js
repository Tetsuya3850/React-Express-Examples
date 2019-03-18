import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import AuthNavbar from "./AuthNavbar";
import UnAuthNavbar from "./UnAuthNavbar";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import User from "./User";

class AppContainer extends Component {
  render() {
    return (
      <Router>
        <div style={styles.container}>
          <AuthRoute
            path="/"
            authComponent={AuthNavbar}
            unAuthComponent={UnAuthNavbar}
          />
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <PrivateRoute path="/users/:userId" component={User} />
        </div>
      </Router>
    );
  }
}

const styles = {
  container: {
    width: 320,
    position: "relative",
    margin: "0 auto"
  }
};

export default AppContainer;
