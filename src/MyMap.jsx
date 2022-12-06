import React, { useEffect, useState,useMemo,useCallback   } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
const MyMap = ({ latlng, zoom }) => {
    // Use the useState hook to track the latlng value, with a default value of null
    const [mapLatLng, setMapLatLng] = useState({ lat: 23.8103, lng: 90.4125 });
  
    // Use the useEffect hook to update the mapLatLng value when the latlng prop changes
    useEffect(() => {
      if (latlng && latlng.lat && latlng.lng) {
        setMapLatLng(latlng);
      }
    }, [latlng]);
    
    // Use the useMemo hook to memoize complex calculations
    const center = useMemo(() => [mapLatLng.lat, mapLatLng.lng], [mapLatLng]);
  
    // Use the useCallback hook to avoid creating new functions on every render
    const handleMapMove = useCallback((event) => {
      // Calculate new center value based on map movement
      const newCenter = event.target.getCenter();
      setMapLatLng({ lat: newCenter.lat, lng: newCenter.lng });
    }, []);
  
    return (
      <MapContainer center={center} zoom={zoom} onMoveEnd={handleMapMove}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} />
      </MapContainer>
    );
  };
export default MyMap