import React, { Component } from "react";
import Gmap from "./Gmap";
import { locations } from "./locations";
import { Marker, InfoWindow } from "react-google-maps";

class App extends Component {
  state = {
    locations: []
  };

  componentDidMount() {
    this.setState({ locations });
  }

  onToggleInfo = id => {
    const new_locations = this.state.locations.map(
      location =>
        id === location.id
          ? { ...location, info_open: !location.info_open }
          : { ...location, info_open: false }
    );
    this.setState({ locations: new_locations });
  };

  render() {
    return (
      <div>
        <Gmap zoom={16} center={[35.578203, 139.585194]}>
          {this.state.locations.map(location => (
            <Marker
              key={location.id}
              position={{ lat: location.latLng.lat, lng: location.latLng.lng }}
              onClick={() => this.onToggleInfo(location.id)}
            >
              {location.info_open && (
                <InfoWindow
                  key={location.id}
                  onCloseClick={() => this.onToggleInfo(location.id)}
                >
                  <div>
                    <p>{location.title}</p>
                    <p>{location.address}</p>
                    <p>{location.call}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </Gmap>
      </div>
    );
  }
}

export default App;
