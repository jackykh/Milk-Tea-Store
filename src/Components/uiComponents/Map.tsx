import React, { useEffect, useRef } from "react";

const Map: React.FC<{
  className: string;
  center: { lat: number; lng: number };
  zoom: number;
}> = (props) => {
  const { center, zoom, className } = props;
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        zoom,
        center,
      });
      new google.maps.Marker({ position: center, map: map });
    }
  }, [center, zoom]);

  return <div ref={mapRef} className={className}></div>;
};

export default Map;
