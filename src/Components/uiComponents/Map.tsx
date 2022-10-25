import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Map: React.FC<{
  className: string;
  center: { lat: number; lng: number };
  zoom: number;
}> = (props) => {
  const { center, zoom, className } = props;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY as string,
  });

  return isLoaded ? (
    <GoogleMap mapContainerClassName={className} center={center} zoom={zoom}>
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <></>
  );
};
export default Map;
