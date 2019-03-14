import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthed } from "../tokenUtils";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthed() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
