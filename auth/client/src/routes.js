import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppContainer from "./components/AppContainer";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";

export default function getRoutes() {
  return (
    <Router>
      <Switch>
        <AppContainer>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
        </AppContainer>
      </Switch>
    </Router>
  );
}
