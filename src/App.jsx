import "leaflet/dist/leaflet.css";
import React, { useEffect, useState, lazy, Suspense } from "react";
const LazyMap = lazy(() => import("./MyMap"));

const App = () => {
  // Use the useState hook to track the user's current location
  const [location, setLocation] = useState(null);

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
    <div style={{ margin: "auto" }}>
      {location ? (
        <Suspense fallback="Loading map...">
          <LazyMap latlng={location} zoom={13} />
        </Suspense>
      ) : (
        "Loading location..."
      )}
    </div>
  );
};

export default App;
