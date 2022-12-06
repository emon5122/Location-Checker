import React, { useState, useEffect } from "react";
import Map from "./Map";

const App = () => {
    // const Dhaka = { latitude: 23.8103, longitude: 90.4125 };
    const [location, setLocation] = useState();

    useEffect(() => {
      // check if geolocation is supported by the browser
      if ('geolocation' in navigator) {
        // get the current position
        navigator.geolocation.getCurrentPosition((position) => {
          // update the state with the current position
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        });
    
        // watch for changes to the position and update the state
        const watchId = navigator.geolocation.watchPosition((position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        });
    
        // return a cleanup function to stop watching for changes
        // when the component unmounts
        return () => navigator.geolocation.clearWatch(watchId);
      }
    }, []);
    return (
        <div>
            <Map latlng={location} zoom={13} />
        </div>
    );
};

export default App;
