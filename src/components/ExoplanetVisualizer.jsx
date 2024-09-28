import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import exoplanets from "./planets.json";
import earthTextureImage from "../assets/images/textures/earth.jpg";
import exoplanetTextureImage from "../assets/images/textures/mars.jpg";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

// Earth Component
const Earth = () => {
  const colorMap = useLoader(TextureLoader, earthTextureImage);

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
};

// Exoplanet Component
const Exoplanet = React.memo(({ position, texture, name, distance, onClick }) => {
  const colorMap = useLoader(TextureLoader, texture);

  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
});

// Hash Function
const hashString = (str) => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }
  return hash;
};

// Position Calculation Function
const getPlanetPosition = (planet) => {
  const distance = parseFloat(planet.distance) / 10; // Scale down for visualization
  const nameHash = hashString(planet.name);

  // Generate consistent angles based on the hash
  const theta = ((nameHash % 360) * Math.PI) / 180; // Azimuthal angle
  const phi = (((nameHash * 13) % 180) * Math.PI) / 180; // Polar angle

  const x = distance * Math.sin(phi) * Math.cos(theta);
  const y = distance * Math.sin(phi) * Math.sin(theta);
  const z = distance * Math.cos(phi);

  return [x, y, z];
};

const ExoplanetVisualizer = () => {
  const [page, setPage] = useState(0);
  const pageSize = 100;
  const [maxDistance, setMaxDistance] = useState(100000);
  const [searchQuery, setSearchQuery] = useState(""); // New state variable
  const [clickedPlanetName, setClickedPlanetName] = useState("");
  const [clickedPlanetDistance, setClickedPlanetDistance] = useState(0);
  const [showDetails, setshowDetails] = useState(false);

  // Process the imported exoplanet data
  const planetData = exoplanets.map((planet) => ({
    name: planet.pl_name,
    distance: (parseFloat(planet.sy_dist) * 10.262).toFixed(2), // Adjusted conversion factor
  }));

  // Updated filter to include search query
  const filteredExoplanets = planetData.filter(
    (planet) => parseFloat(planet.distance) <= maxDistance && planet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredExoplanets.length / pageSize);
  const currentPageExoplanets = filteredExoplanets.slice(page * pageSize, (page + 1) * pageSize);

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
        }}
      >
        <div className="card-body">
          <h5 className="card-title">Exoplanet Controls</h5>

          {/* Max Distance Input */}
          <form>
            <div className="form-group">
              <label htmlFor="maxDistanceInput">Max Distance (light-years):</label>
              <input
                type="number"
                className="form-control form-control-sm"
                id="maxDistanceInput"
                value={maxDistance}
                onChange={(e) => {
                  setMaxDistance(e.target.value);
                  setPage(0); // Reset to first page when filter changes
                }}
              />
            </div>

            {/* Search Filter */}
            <div className="form-group">
              <label htmlFor="searchQueryInput">Search by Name:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="searchQueryInput"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(0); // Reset to first page when search changes
                }}
              />
            </div>
          </form>

          {/* Clicked Planet Details */}
          {showDetails && (
            <div>
              <h5 className="text-success font-weight-bold mt-3">Name: {clickedPlanetName}</h5>
              <h5 className="text-success font-weight-bold">Distance: {clickedPlanetDistance} light-years away from Earth.</h5>
            </div>
          )}
          {/* Go To Home Page Button */}
          <Link className="btn btn-outline-success btn-sm mt-3" to="/">
            Go To Home Page
          </Link>
        </div>
      </div>

      {/* 3D Visualization Canvas */}
      <Canvas style={{ height: "100vh", background: "#000" }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Earth />
          {currentPageExoplanets.map((planet, index) => {
            const position = getPlanetPosition(planet);

            const handleClick = () => {
              setClickedPlanetName(planet.name);
              setClickedPlanetDistance(planet.distance);
              setshowDetails(true);
            };

            return (
              <React.Fragment key={index}>
                <Exoplanet name={planet.name} distance={planet.distance} position={position} texture={exoplanetTextureImage} onClick={handleClick} />
                {/* Name labels are hidden */}
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
          position: "absolute",
          bottom: "10px",
          width: "100%",
          textAlign: "center",
          zIndex: 1,
          color: "#fff",
        }}
      >
        <button onClick={() => setPage(page - 1)} disabled={page === 0} style={{ marginRight: "10px" }}>
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ExoplanetVisualizer;
