import React, { useState, useEffect } from "react";

const DataStats = (props) => {
  const { file, refLat, refLong, refAlt, startButton } = props;

  const [markers, setMarkers] = useState([]);
  const [distances, setDistances] = useState([]);

  const extractMarkers = () => {
    if (file === undefined) {
      //   console.log("File is undefined");
    } else {
      //   console.log("File is defined");
      setMarkers(
        file.data.map((item, index) => ({
          id: index, // Unique identifier for each marker
          lat: parseFloat(item.Latitude),
          lng: parseFloat(item.Longitude),
          alt: parseFloat(item.Altitude),
        }))
      );
    }
  };

  useEffect(() => {
    extractMarkers();
    calcDistances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    file.data,
    refLat,
    refLong,
    refAlt,
    startButton,
    markers.length,
    distances.length,
  ]);

  // Calc distances

  const calcDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371 * 1000; // Earth's radius in meters

    // Convert latitude and longitude differences to radians
    const latDiffRad = (lat2 - lat1) * (Math.PI / 180);
    const lonDiffRad = (lon2 - lon1) * (Math.PI / 180);

    // Haversine formula
    const a =
      Math.sin(latDiffRad / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(lonDiffRad / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return distance.toFixed(2); // Return distance rounded to 2 decimal places
  };

  // Calc all fix errors wrt ref coordinates
  const calcDistances = () => {
    if (markers.length > 1) {
      const distances = markers.map((data, index) => {
        const id = data.id;
        const lat = data.lat;
        const long = data.lng;
        const alt = data.alt;
        const distance = parseFloat(calcDistance(refLat, refLong, lat, long));
        return distance;
      });
      //   console.log(distances);
      setDistances(distances);
    }
  };

  const statsRender = () => {
    if (markers.length > 1) {
      return <div>Distance: {distances}</div>;
    }
  };

  console.log(markers, refLat, refLong, refAlt, distances, startButton);

  return statsRender();
};

export default DataStats;
