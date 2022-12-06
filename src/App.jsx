import React, { useEffect, useState } from "react";
import MyMap from "./MyMap";
import "../tailwind.css";

function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.watchPosition(function (position) {
      setLocation(position.coords);
    });
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
}

export default App;
