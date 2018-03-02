import React, { Component } from "react";
import Gmap from "./Gmap";

class App extends Component {
  render() {
    return (
      <div>
        <Gmap
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB-nYtMpDDba9t4lp32MihmrqowsHg00WA"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `800px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default App;
