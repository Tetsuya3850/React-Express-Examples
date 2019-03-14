import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NavBar from "./NavBar";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import NewArticle from "./NewArticle";
import Profile from "./Profile";
import NoMatch from "./NoMatch";

class AppContainer extends Component {
  render() {
    return (
      <Router>
        <div style={styles.container}>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/new-article" component={NewArticle} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const styles = {
  container: {
    width: 300,
    position: "relative",
    margin: "0 auto"
  }
};

export default AppContainer;
