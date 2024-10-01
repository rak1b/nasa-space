import React, { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import exoplanetData from './planets.json';

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
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth < 768 ? window.innerWidth * 0.9 : window.innerWidth / 2,
    height: window.innerHeight * 0.6,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth < 768 ? window.innerWidth * 0.9 : window.innerWidth / 2,
        height: window.innerHeight * 0.6,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadExoplanets = () => {
      const planets = exoplanetData.slice(2, 200)
        .filter((planet) => planet.sy_dist !== null)
        .map((planet, index) => ({
          name: planet.pl_name,
          distance: planet.sy_dist || 1,
          coordinates: {
            lat: Math.random() * 180 - 90,
            lng: Math.random() * 360 - 180,
          },
          color: getRandomColor(),
          radius: Math.max(0.5, planet.sy_dist / 100),
          id: index,
        }));

      setExoplanets(planets);
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Horizontally center the globe
        alignItems: 'center', // Vertically center the globe
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden', // Ensure the globe does not overflow
      }}
    >
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        pointsData={exoplanets}
        pointAltitude={() => 0}
        pointColor={(d) => d.color}
        pointRadius={(d) => d.radius}
        pointLabel={(d) => `${d.name}: ${d.distance} light years from Earth`}
        pointLat={(d) => d.coordinates.lat}
        pointLng={(d) => d.coordinates.lng}
        onPointClick={handleClick}
        width={dimensions.width} // Updated width based on screen size
        height={dimensions.height} // Updated height based on screen size
      />
    </div>
  );
};

export default ExoplanetSystem;
