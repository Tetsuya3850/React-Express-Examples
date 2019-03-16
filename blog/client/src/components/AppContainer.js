import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import AuthNavBar from "./AuthNavBar";
import UnAuthNavBar from "./UnAuthNavBar";
import Feed from "./Feed";
import Hello from "./Hello";
import Signup from "./Signup";
import Signin from "./Signin";
import NewArticle from "./NewArticle";
import User from "./User";
import ArticleDetail from "./ArticleDetail";

class AppContainer extends Component {
  render() {
    return (
      <Router>
        <div style={styles.container}>
          <AuthRoute
            path="/"
            authComponent={AuthNavBar}
            unAuthComponent={UnAuthNavBar}
          />
          <AuthRoute
            exact
            path="/"
            authComponent={Feed}
            unAuthComponent={Hello}
          />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <PrivateRoute path="/new-article" component={NewArticle} />
          <PrivateRoute path="/users/:userId" component={User} />
          <PrivateRoute path="/articles/:articleId" component={ArticleDetail} />
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
