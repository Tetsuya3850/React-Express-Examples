import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

let PrivateRoute = ({ component: Component, isAuthed, userInfo, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthed && userInfo._id === props.match.params.uid) {
        return <Component {...props} />;
      } else if (isAuthed && props.match.params.uid === undefined) {
        return <Redirect to={`${props.location.pathname}/${userInfo._id}`} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }
    }}
  />
);

const mapStateToProps = state => {
  return state;
};

PrivateRoute = connect(mapStateToProps, null)(PrivateRoute);

export default withRouter(PrivateRoute);
