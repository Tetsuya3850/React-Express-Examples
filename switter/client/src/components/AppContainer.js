import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { reAuthUser } from "../redux/users";
import PrivateRoute from "./PrivateRoute";
import NavBar from "./NavBar";
import Home from "./Home";
import Auth from "./Auth";
import SocialAuthRedirect from "./SocialAuthRedirect";
import Profile from "./Profile";
import SweetComments from "./SweetComments";

class AppContainer extends Component {
  componentWillMount() {
    this.props.dispatch(reAuthUser(() => this.props.history.push("/auth")));
  }

  render() {
    return (
      <Router>
        <div style={{ margin: "auto", width: 400 }}>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Auth} />
          <Route path="/socialauthredirect/" component={SocialAuthRedirect} />
          <PrivateRoute path="/profile/:uid" component={Profile} />
          <PrivateRoute path="/comments/:sweetId" component={SweetComments} />
        </div>
      </Router>
    );
  }
}

AppContainer = connect()(AppContainer);

export default AppContainer;
