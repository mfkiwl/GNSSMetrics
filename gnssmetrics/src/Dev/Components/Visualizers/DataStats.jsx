import React, { useState, useEffect } from "react";

const DataStats = (props) => {
  const { file, refLat, refLong, refAlt, startButton } = props;

  const [markers, setMarkers] = useState([]);
  const [distances, setDistances] = useState([]);
  const [cep50, setCep50] = useState();
  const [cep90, setCep90] = useState();
  const [cep98, setCep98] = useState();
  const [meanCep50, setMeanCep50] = useState();
  const [meanCep90, setMeanCep90] = useState();
  const [meanCep98, setMeanCep98] = useState();
  const extractMarkers = () => {
    try {
      if (file === undefined) {
        // File is not defined
      } else {
        // File is defined, extract markers
        setMarkers(
          file.data.map((item, index) => ({
            id: index,
            lat: parseFloat(item.Latitude),
            lng: parseFloat(item.Longitude),
            alt: parseFloat(item.Altitude),
          }))
        );
      }
    } catch (error) {
      console.error("Error occurred while extracting markers:", error);
    }
  };

  useEffect(() => {
    try {
      extractMarkers();
      calcStats();
    } catch (error) {
      console.error("Error occurred while calculating stats:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    file.data,
    refLat,
    refLong,
    refAlt,
    startButton,
    markers.length,
    distances.length,
    cep50,
    cep90,
    cep98,
  ]);

  const calcDistance = (lat1, lon1, lat2, lon2) => {
    try {
      const earthRadius = 6371 * 1000; // Earth's radius in meters

      const toRadians = (degrees) => {
        return degrees * (Math.PI / 180);
      };

      const latDiffRad = toRadians(lat2 - lat1);
      const lonDiffRad = toRadians(lon2 - lon1);

      const a =
        Math.sin(latDiffRad / 2) ** 2 +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(lonDiffRad / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = earthRadius * c;

      return distance.toFixed(2);
    } catch (error) {
      console.error("Error occurred while calculating distance:", error);
      return "";
    }
  };

  const calcStats = () => {
    try {
      if (markers.length > 1) {
        const fixErrors = markers.map((data) => {
          const { lat, lng } = data;
          const fixError = parseFloat(calcDistance(refLat, refLong, lat, lng));
          return fixError;
        });
        setDistances(fixErrors);
        console.log(fixErrors);

        const sortedDistances = distances.sort((a, b) => a - b);
        const cep50Index = Math.floor(sortedDistances.length * 0.5);
        const cep90Index = Math.floor(sortedDistances.length * 0.9);
        const cep98Index = Math.floor(sortedDistances.length * 0.98);

        setCep50(sortedDistances[cep50Index]);
        setCep90(sortedDistances[cep90Index]);
        setCep98(sortedDistances[cep98Index]);

        const mean =
          distances.reduce((sum, distance) => sum + distance, 0) /
          distances.length;
        const squaredDistances = distances.map(
          (distance) => (distance - mean) ** 2
        );

        const sortedSquaredDistances = squaredDistances.sort((a, b) => a - b);
        const meanCep50Index = Math.floor(sortedSquaredDistances.length * 0.5);
        const meanCep90Index = Math.floor(sortedSquaredDistances.length * 0.9);
        const meanCep98Index = Math.floor(sortedSquaredDistances.length * 0.98);

        const meanCep50 = Math.sqrt(sortedSquaredDistances[meanCep50Index]);
        const meanCep90 = Math.sqrt(sortedSquaredDistances[meanCep90Index]);
        const meanCep98 = Math.sqrt(sortedSquaredDistances[meanCep98Index]);

        setMeanCep50(meanCep50.toFixed(2));
        setMeanCep90(meanCep90.toFixed(2));
        setMeanCep98(meanCep98.toFixed(2));
      }
    } catch (error) {
      console.error("Error occurred while calculating stats:", error);
    }
  };

  const statsRender = () => {
    try {
      if (markers.length > 1) {
        return (
          <div>
            <div>Distance: {distances}</div>
            <div>CEP50: {cep50}</div>
            <div>CEP90: {cep90}</div>
            <div>CEP98: {cep98}</div>
            <div>Mean CEP50: {meanCep50}</div>
            <div>Mean CEP90: {meanCep90}</div>
            <div>Mean CEP98: {meanCep98}</div>
          </div>
        );
      }
    } catch (error) {
      console.error("Error occurred while rendering stats:", error);
      return null;
    }
  };

  console.log(markers, refLat, refLong, refAlt, distances, startButton);

  return statsRender();
};

export default DataStats;
