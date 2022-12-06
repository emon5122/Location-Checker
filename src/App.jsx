import React, { useEffect, useMemo, useState } from "react";
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

  return (
    <MapContainer center={center} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center} />
    </MapContainer>
  );
};


const App = () => {
  // Use the useState hook to track the user's current location
  const [location, setLocation] = useState(null);
  // MyMap.defaultProps = {
  //   latlng: { lat: 23.8103, lng: 90.4125 }
  // };
  

  // Use the useEffect hook to get the user's location when the component is mounted
  useEffect(() => {
    async function watchPosition() {
      navigator.geolocation.watchPosition(function (position) {
        setLocation(position.coords);
      });
    }
    watchPosition();
  }, []);
  

  return (
    <div className="map-container">
      {location ? (
        <MyMap latlng={location} zoom={13} />
      ) : (
        "Loading map..."
      )}
    </div>
  );
};

export default App;
