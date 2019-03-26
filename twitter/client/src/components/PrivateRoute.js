import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

let PrivateRoute = ({ component: Component, isAuthed, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthed) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: props.location }
            }}
          />
        );
      }
    }}
  />
);

const mapStateToProps = ({ users }) => {
  return users;
};

PrivateRoute = connect(mapStateToProps, null)(PrivateRoute);

export default withRouter(PrivateRoute);
