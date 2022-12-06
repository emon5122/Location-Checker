import React, { useEffect, useMemo, useRef } from "react";
import { useMeasure } from "react-use";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const MyMap = ({ latlng, zoom }) => {
  // Use the useMeasure hook to only render the map when it's visible on the screen
  const [ref, { width, height }] = useMeasure();

  // Use the useRef hook to only update the map when the latlng or zoom props change
  const mapRef = useRef();
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.leafletElement.setView(latlng, zoom);
    }
  }, [latlng, zoom]);

  // Use the useMemo hook to memoize complex calculations
  const center = useMemo(() => [latlng.lat, latlng.lng], [latlng]);

  // Use the useEffect hook to delay rendering the map until all the data has been loaded
  useEffect(() => {
    if (width && height && latlng) {
      mapRef.current.leafletElement.invalidateSize();
    }
  }, [width, height, latlng]);

  return (
    <div ref={ref}>
      {width && height && latlng ? (
        <MapContainer ref={mapRef} center={center} zoom={zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={center} />
        </MapContainer>
      ) : (
        "Loading map..."
      )}
    </div>
  );
};
export default MyMap