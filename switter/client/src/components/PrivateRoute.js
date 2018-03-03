import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

let PrivateRoute = ({ component: Component, users, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (users.isAuthed && users.userInfo._id === props.match.params.uid) {
        return <Component {...props} />;
      } else if (users.isAuthed && props.match.params.uid === undefined) {
        return (
          <Redirect to={`${props.location.pathname}/${users.userInfo._id}`} />
        );
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
  return { users };
};

PrivateRoute = connect(mapStateToProps, null)(PrivateRoute);

export default withRouter(PrivateRoute);
