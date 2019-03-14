import React from "react";

function NoMatch({ location }) {
  return (
    <div>
      <p>No match for {location.pathname}</p>
    </div>
  );
}

export default NoMatch;
