import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NavBar from "./NavBar";
import Home from "./Home";
import Auth from "./Auth";
import SocialAuthRedirect from "./SocialAuthRedirect";
import ItemDetail from "./ItemDetail";
import Cart from "./Cart";
import User from "./User";
import AddReview from "./AddReview";
import EditReview from "./EditReview";
import { reAuthUser } from "../reducer/users";
import { connect } from "react-redux";

class AppContainer extends Component {
  componentWillMount() {
    this.props.dispatch(reAuthUser(() => this.props.history.push("/auth")));
  }

  render() {
    return (
      <Router>
        <div style={{ margin: "auto", width: 320 }}>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Auth} />
          <Route path="/socialauthredirect/" component={SocialAuthRedirect} />
          <Route path="/detail/:itemId" component={ItemDetail} />
          <PrivateRoute path="/cart/:uid" component={Cart} />
          <PrivateRoute path="/users/:uid" component={User} />
          <PrivateRoute path="/addreview/:itemId" component={AddReview} />
          <PrivateRoute path="/editreview/:itemId" component={EditReview} />
        </div>
      </Router>
    );
  }
}

AppContainer = connect()(AppContainer);

export default AppContainer;
