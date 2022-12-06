import React from "react";
import { Marker } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "./Map.css";

export default function Map({ latlng, zoom }) {
    const centered = latlng
        ? latlng
        : {
            lat: 23.8103,
            lng: 90.4125,
        };
        console.log(centered)
    return (
        <MapContainer center={centered} zoom={zoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={centered} />
        </MapContainer>
    );
}
