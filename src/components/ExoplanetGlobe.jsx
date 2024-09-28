import React, { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import exoplanetData from './planets.json'; // Import your JSON file

// Function to generate a random color in hexadecimal format
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ExoplanetSystem = () => {
  const [exoplanets, setExoplanets] = useState([]);
  const globeEl = useRef();

  useEffect(() => {
    const loadExoplanets = () => {
      const planets = exoplanetData.slice(2, 200)
        .filter((planet) => planet.sy_dist !== null) // Filter out planets with null distance
        .map((planet, index) => ({
          name: planet.pl_name,
          distance: planet.sy_dist || 1, // Fallback distance if null
          coordinates: {
            lat: Math.random() * 180 - 90, // Replace with real latitudes if available
            lng: Math.random() * 360 - 180, // Replace with real longitudes if available
          },
          color: getRandomColor(), // Assign a random color to each planet
          radius: Math.max(0.5, planet.sy_dist / 100), // Simple size based on distance
          id: index,
        }));

      setExoplanets(planets); // Update state with exoplanet data
    };

    loadExoplanets();
  }, []);

  const handleClick = (planet) => {
    globeEl.current.pointOfView(
      { lat: planet.coordinates.lat, lng: planet.coordinates.lng, altitude: 0.5 },
      1500
    );
    alert(`Planet: ${planet.name}\nDistance: ${planet.distance} light years`);
  };

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        pointsData={exoplanets} // Use the planets data as points
        pointAltitude={() => 0} // Set altitude to 0 to keep points flat on the surface
        pointColor={(d) => d.color} // Random point color
        pointRadius={(d) => d.radius} // Radius based on planet size or distance
        pointLabel={(d) => `${d.name}: ${d.distance} light years from Earth`} // Tooltip
        pointLat={(d) => d.coordinates.lat} // Latitude for the point
        pointLng={(d) => d.coordinates.lng} // Longitude for the point
        onPointClick={handleClick} // Click event handler
        width={window.innerWidth / 2} // Adjusted width to fit in half the screen
        height={window.innerHeight} // Adjusted height to fit the viewport
      />
    </div>
  );
};

export default ExoplanetSystem;
