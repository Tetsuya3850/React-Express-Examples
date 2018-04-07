import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NavBar from "./NavBar";
import Home from "./Home";
import SocialAuthRedirect from "./SocialAuthRedirect";
import ItemDetail from "./ItemDetail";

class AppContainer extends Component {
  render() {
    return (
      <Router>
        <div style={{ margin: "auto", width: 320 }}>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/socialauthredirect/" component={SocialAuthRedirect} />
          <Route path="/detail/:itemId" component={ItemDetail} />
        </div>
      </Router>
    );
  }
}

export default AppContainer;
