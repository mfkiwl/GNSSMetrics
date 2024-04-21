import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "mapbox/mapbox-gl-geocoder";

const DataMap = (file) => {
  const dataMapRender = () => {
    if (file.file) {
      console.log("File:", file.file);
      mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN"; // Replace with your Mapbox access token

      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11", // You can use any Mapbox style
        center: [0, 0], // Initial center coordinates
        zoom: 1, // Initial zoom level
      });

      // Add navigation control (zoom, pan)
      map.addControl(new mapboxgl.NavigationControl());

      // Iterate through the data array and add markers to the map
      file.file.forEach((item) => {
        new mapboxgl.Marker()
          .setLngLat([item.longitude, item.latitude])
          .addTo(map);
      });

      // Add search bar functionality
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });

      map.addControl(geocoder);

      return () => map.remove();
    } else {
    }
  };

  return <div>{dataMapRender()}</div>;
};

export default DataMap;
