import React, { useState, useEffect } from "react";
import Map from "./Map";

const App = () => {
    const [location, setLocation] = useState();

    useEffect(() => {
        // check if geolocation is supported by the browser
        if ("geolocation" in navigator) {
            // get the current position
            navigator.geolocation.getCurrentPosition((position) => {
                // update the state with the current position
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });

            // watch for changes to the position and update the state
            const watchId = navigator.geolocation.watchPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });

            // return a cleanup function to stop watching for changes
            // when the component unmounts
            return () => navigator.geolocation.clearWatch(watchId);
        } 
    }, []);
    
    return (
        <div>
            <Map latlng={location} zoom={10} />
        </div>
    );
};

export default App;
