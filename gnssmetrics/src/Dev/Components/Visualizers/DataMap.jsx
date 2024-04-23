import React, { useEffect, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div className="text-2 text-red-700">{text}</div>
); // Simple marker component

const DataMap = (file) => {
  const [markers, setMarkers] = useState([]);

  const mapRef = useRef();

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

  //   const handleApiLoaded = (map, maps) => {
  //     // You can use map and maps objects here if needed
  //     handleApiLoaded(map, maps);
  //   };

  const defaultProps = {
    center: { lat: 51.0447, lng: -114.0719 },
    zoom: 10,
  };

  const markerRender = () => {
    if (markers.length > 1) {
      return (
        <div className="h-96 w-96 border border-gray-300 rounded-lg overflow-hidden">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            options={{
              zoomControl: false,
              fullscreenControl: false,
              panControl: false,
              draggable: false,
              zoom: false,
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
              mapRef.current = map;
            }}
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
