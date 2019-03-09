import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { reAuthUser } from "../reducers";
import NavBar from "./NavBar";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import Profile from "./Profile";

class AppContainer extends Component {
  componentDidMount() {
    this.props.reAuthUser();
  }

  render() {
    return (
      <Router>
        <div style={styles.container}>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <PrivateRoute path="/profile" component={Profile} />
        </div>
      </Router>
    );
  }
}

const styles = {
  container: {
    width: 300,
    margin: "0 auto"
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ reAuthUser }, dispatch);
};

AppContainer = connect(
  null,
  mapDispatchToProps
)(AppContainer);

export default AppContainer;
