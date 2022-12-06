import React, { useState, useEffect } from "react";
import { Marker } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "./App.css";

const App = () => {
    // Use the useState hook to track the user's current location
    const [location, setLocation] = useState(null);

    // Use the useEffect hook to get the user's location when the component is mounted
    useEffect(() => {
        navigator.geolocation.watchPosition(function (position) {
            setLocation(position.coords);
        });
    }, []);

    return (
        <div>
            {location ? (
                <Map latlng={location} zoom={13} />
            ) : (
                "Loading location..."
            )}
        </div>
    );
};

const Map = ({ latlng, zoom }) => {
    // Use the useState hook to track the map's center coordinates
    const [mapLatLng, setMapLatLng] = useState({ lat: 23.8103, lng: 90.4125 });

    // Use the useEffect hook to update the mapLatLng value when the latlng prop changes
    useEffect(() => {
        if (latlng && latlng.lat && latlng.lng) {
            setMapLatLng(latlng);
        }
    }, [latlng]);

    // Calculate center coordinates
    const center = [mapLatLng.lat, mapLatLng.lng];

    // Handle map movement by updating the center coordinates
    const handleMapMove = () => {
        const newCenter = map.leafletElement.getCenter();
        setMapLatLng({ lat: newCenter.lat, lng: newCenter.lng });
    };

    return (
        <MapContainer center={center} zoom={zoom} onMoveEnd={handleMapMove}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center} shouldUpdate={true} />
        </MapContainer>
    );
};

export default App;
