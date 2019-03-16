import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthed } from "../tokenUtils";

const PrivateRoute = ({ authedId, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const authedId = isAuthed();
      return authedId ? (
        <Component {...props} authedId={authedId} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

export default PrivateRoute;
