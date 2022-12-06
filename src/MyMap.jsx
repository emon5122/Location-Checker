import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const MyMap = ({ latlng, zoom }) => {
  // Use the useRef hook to store the MapContainer instance
  const mapRef = useRef(null);

  // Use the useState hook to track the map's center coordinates
  const [mapLatLng, setMapLatLng] = useState({ lat: 23.8103, lng: 90.4125 });

  // Use the useEffect hook to update the mapLatLng value when the latlng prop changes
  useEffect(() => {
    if (latlng && latlng.lat && latlng.lng) {
      setMapLatLng(latlng);
    }
  }, [latlng]);

  // Use the useMemo hook to memoize the calculated center coordinates
  const center = useMemo(() => [mapLatLng.lat, mapLatLng.lng], [mapLatLng]);

  // Use the useCallback hook to avoid creating a new function on every render
  const handleMapMove = useCallback(() => {
    // Get the MapContainer instance from the mapRef object
    const map = mapRef.current;
    if (map) {
      // Calculate new center value based on map movement
      const newCenter = map.leafletElement.getCenter();
      setMapLatLng({ lat: newCenter.lat, lng: newCenter.lng });
    }
  }, []);

  // Use the useMemo hook to memoize the TileLayer component
  const tileLayer = useMemo(
    () => (
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    ),
    []
  );

  return (
    <MapContainer ref={mapRef} center={center} zoom={zoom} onMoveEnd={handleMapMove}>
      {tileLayer}
      <Marker position={center} shouldUpdate={false} />
    </MapContainer>
  );
};


export default MyMap;
