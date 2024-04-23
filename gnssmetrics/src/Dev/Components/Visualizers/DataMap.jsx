import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div className="text-2 text-red-700">{text}</div>
); // Simple marker component

const DataMap = (file) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (file.file) {
      setMarkers(
        file.file.data.map((item, index) => ({
          id: index, // Unique identifier for each marker
          lat: parseFloat(item.Latitude),
          lng: parseFloat(item.Longitude),
        }))
      );
    }
  }, [file.file]);

  const handleApiLoaded = (map, maps) => {
    // You can use map and maps objects here if needed
  };

  const defaultProps = {
    center: { lat: 51.1234561, lng: -114.1234561 },
    zoom: 11,
  };

  const markerRender = () => {
    if (markers.length > 1) {
      return (
        <div className="h-96 w-96 border border-gray-300 rounded-lg overflow-hidden">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCcjwHXWO4tulcy-kvMG1WVoA9Vp9reLxM",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            {markers.map((marker, index) => (
              <AnyReactComponent
                key={index}
                lat={marker.lat}
                lng={marker.lng}
                text={marker.id}
              />
            ))}
          </GoogleMapReact>
        </div>
      );
    }
  };

  return markerRender();
};

export default DataMap;
