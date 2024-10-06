import React, { Suspense, useState, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Html, Ring } from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from "three";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

// Texture Images
import mercuryTextureImage from "../assets/images/textures/mercury.jpg";
import venusTextureImage from "../assets/images/textures/venus.jpg";
import earthTextureImage from "../assets/images/textures/earth.jpg";
import marsTextureImage from "../assets/images/textures/mars.jpg";
import jupiterTextureImage from "../assets/images/textures/jupiter.jpg";
import saturnTextureImage from "../assets/images/textures/saturn.jpg";
import uranusTextureImage from "../assets/images/textures/uranus.jpg";
import neptuneTextureImage from "../assets/images/textures/neptune.jpg";
import exoplanetTextureImage from "../assets/images/textures/exoplanet.jpg"; // Replace with your exoplanet texture
import exoplanets from "./planets.json"; // Ensure planets.json exists and is correctly formatted

// Utility: Hash Function to Generate Consistent Positions for Exoplanets
const hashString = (str) => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Utility: Calculate Position Based on Distance and Hash
const getPlanetPosition = (planet, scale = 0.1, baseDistance = 30) => {
  const distance = parseFloat(planet.distance) * scale + baseDistance; // Apply scaling and base distance
  const nameHash = hashString(planet.name);

  // Generate consistent angles based on the hash
  const theta = ((nameHash % 360) * Math.PI) / 180; // Azimuthal angle
  const phi = (((nameHash * 13) % 180) * Math.PI) / 180; // Polar angle

  const x = distance * Math.sin(phi) * Math.cos(theta);
  const y = distance * Math.sin(phi) * Math.sin(theta);
  const z = distance * Math.cos(phi);

  return [x, y, z];
};

// Solar System Planets Data (Sizes scaled down to be under 1)
const solarSystemPlanets = [
  { name: "Mercury", texture: mercuryTextureImage, size: 0.19, distance: 5, speed: 0.04 },
  { name: "Venus", texture: venusTextureImage, size: 0.475, distance: 7, speed: 0.015 },
  { name: "Earth", texture: earthTextureImage, size: 0.5, distance: 9, speed: 0.01 },
  { name: "Mars", texture: marsTextureImage, size: 0.265, distance: 11, speed: 0.008 },
  { name: "Jupiter", texture: jupiterTextureImage, size: 1, distance: 15, speed: 0.002 },
  { name: "Saturn", texture: saturnTextureImage, size: 0.725, distance: 19, speed: 0.0015 },
  { name: "Uranus", texture: uranusTextureImage, size: 0.8, distance: 23, speed: 0.001 },
  { name: "Neptune", texture: neptuneTextureImage, size: 0.75, distance: 27, speed: 0.0008 },
];

// Generic Planet Component
const Planet = ({ name, texture, size, distance, speed }) => {
  const colorMap = useLoader(TextureLoader, texture);
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    ref.current.position.x = distance * Math.cos(t);
    ref.current.position.z = distance * Math.sin(t);
    // Optionally, rotate the planet on its axis
    ref.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={colorMap} />
      {/* Label */}
      <Html distanceFactor={10}>
        <div
          style={{
            color: "white",
            background: "rgba(0,0,0,0.5)",
            padding: "2px 5px",
            borderRadius: "3px",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
      </Html>
    </mesh>
  );
};

// Exoplanet Component
const Exoplanet = React.memo(({ position, texture, name, distance, onClick }) => {
  const colorMap = useLoader(TextureLoader, texture);

  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[1, 26, 26]} /> {/* Increased size for better visibility */}
      <meshStandardMaterial map={colorMap} />
      {/* Label */}
      <Html distanceFactor={12}>
        <div
          style={{
            color: "yellow",
            background: "rgba(0,0,0,0.5)",
            padding: "2px 5px",
            borderRadius: "3px",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
      </Html>
    </mesh>
  );
});

// Main ExoplanetVisualizer Component
const ExoplanetVisualizer = () => {
  const [page, setPage] = useState(0);
  const pageSize = 50; // Reduced page size for better performance
  const [maxDistance, setMaxDistance] = useState(500); // Adjust max distance as needed (scaled)
  const [searchQuery, setSearchQuery] = useState("");
  const [clickedPlanetName, setClickedPlanetName] = useState("");
  const [clickedPlanetDistance, setClickedPlanetDistance] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Process the imported exoplanet data
  const planetData = useMemo(
    () =>
      exoplanets.map((planet) => ({
        name: planet.pl_name,
        distance: parseFloat(planet.sy_dist) * 2, // Adjusted scaling factor to bring exoplanets closer
      })),
    []
  );

  // Updated filter to include search query
  const filteredExoplanets = useMemo(
    () => planetData.filter((planet) => planet.distance <= maxDistance && planet.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [planetData, maxDistance, searchQuery]
  );

  const totalPages = Math.ceil(filteredExoplanets.length / pageSize);
  const currentPageExoplanets = useMemo(() => filteredExoplanets.slice(page * pageSize, (page + 1) * pageSize), [filteredExoplanets, page, pageSize]);

  // Handle Exoplanet Click
  const handleExoplanetClick = (planet) => {
    setClickedPlanetName(planet.name);
    setClickedPlanetDistance(planet.distance.toFixed(2));
    setShowDetails(true);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Filter Controls */}
      <div
        className="card text-white bg-dark mb-3"
        style={{
          position: "absolute",
          zIndex: 1,
          padding: "10px",
          width: "300px",
          top: "10px",
          left: "10px",
          opacity: 0.8,
        }}
      >
        <div className="card-body" style={{ background: 'linear-gradient(135deg, #1a237e, #283593)', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h5 className="card-title" style={{ color: '#ffeb3b', fontWeight: 'bold', marginBottom: '20px' }}>Exoplanet Controls</h5>

          {/* Max Distance Input */}
          <form>
            <div className="form-group mb-3">
              <label htmlFor="maxDistanceInput" style={{ color: '#81d4fa' }}>Max Distance (light-years):</label>
              <input
                type="number"
                className="form-control form-control-sm"
                id="maxDistanceInput"
                value={maxDistance}
                onChange={(e) => {
                  setMaxDistance(Number(e.target.value));
                  setPage(0);
                }}
                min="0"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid #4fc3f7' }}
              />
            </div>

            {/* Search Filter */}
            <div className="form-group mb-3">
              <label htmlFor="searchQueryInput" style={{ color: '#81d4fa' }}>Search by Name:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="searchQueryInput"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(0);
                }}
                placeholder="Enter planet name"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid #4fc3f7' }}
              />
            </div>
          </form>

          {/* Clicked Planet Details */}
          {showDetails && (
            <div style={{ background: 'rgba(76, 175, 80, 0.1)', padding: '10px', borderRadius: '4px', marginTop: '15px' }}>
              <h5 style={{ color: '#69f0ae', fontWeight: 'bold', marginBottom: '5px' }}>Name: {clickedPlanetName}</h5>
              <h5 style={{ color: '#69f0ae', fontWeight: 'bold' }}>Distance: {clickedPlanetDistance} light-years away from Earth.</h5>
            </div>
          )}
          {/* Go To Home Page Button */}
          <Link to="/app" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              size="small"
              sx={{
                mt: 3,
                backgroundColor: '#ff4081',
                color: '#fff',
                border: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#f50057',
                },
              }}
            >
              Home
            </Button>
          </Link>
        </div>
      </div>

      {/* 3D Visualization Canvas */}
      <Canvas
        style={{ height: "100vh", background: "#000" }}
        camera={{ position: [0, 0, 100], fov: 60, near: 1, far: 1000 }} // Adjusted far plane
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 20, 20]} />
        <Suspense fallback={<Html>Loading...</Html>}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          {/* Render Orbits for Solar System Planets */}
          {solarSystemPlanets.map((planet, index) => (
            <Ring
              key={`orbit-${index}`}
              args={[planet.distance - 0.05, planet.distance + 0.05, 64]} // Orbit thickness
              rotation={[Math.PI / 2, 0, 0]}
              position={[0, 0, 0]}
            >
              <meshBasicMaterial color="gray" side={THREE.DoubleSide} />
            </Ring>
          ))}

          {/* Render Solar System Planets */}
          {solarSystemPlanets.map((planet, index) => (
            <Planet
              key={`planet-${index}`}
              name={planet.name}
              texture={planet.texture}
              size={planet.size}
              distance={planet.distance}
              speed={planet.speed}
            />
          ))}

          {/* Render Exoplanet Orbits */}
          {currentPageExoplanets.map((planet, index) => {
            const position = getPlanetPosition(planet);

            return (
              <>
                {/* Exoplanet Orbit */}
                <Ring
                  key={`orbit-exo-${index}`}
                  args={[Math.abs(position[0]) - 0.05, Math.abs(position[0]) + 0.05, 64]} // Orbit thickness based on position
                  rotation={[Math.PI / 2, 0, 0]}
                  position={[0, 0, 0]}
                >
                  <meshBasicMaterial color="purple" side={THREE.DoubleSide} />
                </Ring>

                {/* Exoplanet */}
                <Exoplanet
                  key={`exoplanet-${index}`}
                  name={planet.name}
                  distance={planet.distance}
                  position={position}
                  texture={exoplanetTextureImage}
                  onClick={() => handleExoplanetClick(planet)}
                />
              </>
            );
          })}
        </Suspense>
        <OrbitControls />
      </Canvas>

      {/* Updated Pagination Controls */}
      <div
        className="pagination-controls"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "15px",
          background: "rgba(0, 0, 0, 0.6)",
          padding: "10px 20px",
          borderRadius: "5px",
          zIndex: 1000,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Button
          variant="contained"
          startIcon={<NavigateBeforeIcon />}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          sx={{
            backgroundColor: '#4caf50',
            '&:hover': {
              backgroundColor: '#45a049',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(76, 175, 80, 0.3)',
            },
          }}
        >
          Previous
        </Button>
        <span style={{ color: '#fff', fontWeight: 'bold' }}>
          Page {page + 1} of {totalPages}
        </span>
        <Button
          variant="contained"
          endIcon={<NavigateNextIcon />}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page + 1 >= totalPages}
          sx={{
            backgroundColor: '#2196f3',
            '&:hover': {
              backgroundColor: '#1e88e5',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(33, 150, 243, 0.3)',
            },
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ExoplanetVisualizer;