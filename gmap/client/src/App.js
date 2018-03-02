import React, { Component } from "react";
import Gmap from "./Gmap";
import { locations } from "./locations";
import { Marker, InfoWindow } from "react-google-maps";

class App extends Component {
  state = {
    locations: [],
    center: [35.578203, 139.585194]
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

  onToggleBounce = id => {
    const bounce_location = this.state.locations.map(
      location =>
        id === location.id
          ? { ...location, animation: window.google.maps.Animation.BOUNCE }
          : location
    );
    this.setState({ locations: bounce_location, center: locations[id].pos });

    setTimeout(() => {
      const stop_bounce = this.state.locations.map(
        location =>
          id === location.id ? { ...location, animation: undefined } : location
      );
      this.setState({ locations: stop_bounce });
    }, 700);
  };

  render() {
    return (
      <div>
        <Gmap zoom={16} center={this.state.center}>
          {this.state.locations.map(location => (
            <Marker
              key={location.id}
              position={{ lat: location.pos[0], lng: location.pos[1] }}
              onClick={() => {
                this.onToggleBounce(location.id);
                this.onToggleInfo(location.id);
              }}
              defaultAnimation={window.google.maps.Animation.BOUNCE}
              animation={location.animation}
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
