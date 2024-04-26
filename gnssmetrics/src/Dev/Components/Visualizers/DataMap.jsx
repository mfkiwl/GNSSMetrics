import React, { useEffect, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import { IoLocation } from "react-icons/io5";

const AnyReactComponent = ({ text }) => (
  <div className="text-2 text-red-700">
    <IoLocation />
    <p>{text}</p>
  </div>
); // Simple marker component

const DataMap = (file) => {
  const [markers, setMarkers] = useState([]);
  // const [defLat, setDefLat] = useState(51.0447);
  // const [defLong, setDefLong] = useState(-114.0719);

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
      // setDefLat(file.file.data[0].Latitude);
      // setDefLong(file.file.data[0].Longitude);
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
              key: "AIzaSyCcjwHXWO4tulcy-kvMG1WVoA9Vp9reLxM",
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
