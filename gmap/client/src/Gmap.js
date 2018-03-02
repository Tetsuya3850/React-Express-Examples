import React from "react";
import { compose, withProps } from "recompose";
import { withGoogleMap, GoogleMap } from "react-google-maps";

const Gmap = compose(
  withProps({
    loadingElement: <div style={{ height: "100%", backgroundColor: "grey" }} />,
    containerElement: <div style={{ height: "700px" }} />,
    mapElement: <div style={{ height: "100%" }} />
  }),
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: 35.668864, lng: 139.4611935 }}
    zoom={props.zoom}
    center={{ lat: props.center[0], lng: props.center[1] }}
  >
    {props.children}
  </GoogleMap>
));

export default Gmap;
