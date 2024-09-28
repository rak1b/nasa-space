// src/ExoplanetVisualizer.js
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Line, Text } from '@react-three/drei';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import exoplanets from './planets.json'; // Import your JSON file

// Import the textures using the paths you provided
import earthTextureImage from '../assets/images/textures/earth.jpg';
import exoplanetTextureImage from '../assets/images/textures/neptune.jpg';

const Earth = () => {
  const colorMap = useLoader(TextureLoader, earthTextureImage);

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
};

const Exoplanet = React.memo(({ position, texture, name, distance, onClick }) => {
  const colorMap = useLoader(TextureLoader, texture);

  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
});

const ExoplanetVisualizer = () => {
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [maxDistance, setMaxDistance] = useState(100);
  const [Clicked_planet_name, setClicked_planet_name] = useState("");
  const [Clicked_planet_distance,setClicked_planet_distance] = useState(0);

  // Process the imported exoplanet data
  const planetData = exoplanets.map((planet) => ({
    name: planet.pl_name,
    distance: (parseFloat(planet.sy_dist) * 3.262).toFixed(2), // Convert parsecs to light-years
  }));

  const filteredExoplanets = planetData.filter(
    (planet) => parseFloat(planet.distance) <= maxDistance
  );

  const totalPages = Math.ceil(filteredExoplanets.length / pageSize);
  const currentPageExoplanets = filteredExoplanets.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  return (
    <div style={{ position: 'relative' }}>
      {/* Filter Controls */}
      <div
        className="filter-controls"
        style={{
          position: 'absolute',
          zIndex: 1,
          padding: '10px',
          background: 'rgba(0,0,0,0.5)',
          color: '#fff',
        }}
      >
        <label>
          Max Distance (light-years):
          <input
            type="number"
            value={maxDistance}
            onChange={(e) => {
              setMaxDistance(e.target.value);
              setPage(0); // Reset to first page when filter changes
            }}
            style={{ marginLeft: '10px' }}
          />
        </label>

        <div>
          Name: {Clicked_planet_name}
        </div>

        <div>
          Name:{`Distance: ${Clicked_planet_distance} light-years away from Earth.`}
        </div>
      </div>

      {/* 3D Visualization Canvas */}
      <Canvas style={{ height: '100vh', background: '#000' }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <Earth />
          {currentPageExoplanets.map((planet, index) => {
            const position = [
              Math.random() * 20 - 10,
              Math.random() * 20 - 10,
              Math.random() * 20 - 10,
            ];

            const handleClick = () => {
              setClicked_planet_name(planet.name)
              setClicked_planet_distance(planet.distance)
            };

            return (
              <React.Fragment key={index}>
                <Exoplanet
                  name={planet.name}
                  distance={planet.distance}
                  position={position}
                  texture={exoplanetTextureImage}
                  onClick={handleClick}
                />
                {/* <Line
                  points={[
                    [0, 0, 0],
                    position,
                  ]}
                  color="white"
                  lineWidth={1}
                  dashed={false}
                /> */}
                <Text
                  position={position}
                  fontSize={0.5}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                >
                  {planet.name}
                </Text>
              </React.Fragment>
            );
          })}
        </Suspense>
        <OrbitControls />
      </Canvas>

      {/* Pagination Controls */}
      <div
        className="pagination-controls"
        style={{
          position: 'absolute',
          bottom: '10px',
          width: '100%',
          textAlign: 'center',
          zIndex: 1,
          color: '#fff',
        }}
      >
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
          style={{ marginRight: '10px' }}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page + 1 >= totalPages}
          style={{ marginLeft: '10px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExoplanetVisualizer;
