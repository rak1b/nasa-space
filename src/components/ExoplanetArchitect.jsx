import React, { useState, useRef, useEffect } from "react";
import Globe from "react-globe.gl";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DownloadIcon from "@mui/icons-material/Download";

// Import planet textures
import mercuryTextureImage from "../assets/images/textures/mercury.jpg";
import venusTextureImage from "../assets/images/textures/venus.jpg";
import earthTextureImage from "../assets/images/textures/earth.jpg";
import marsTextureImage from "../assets/images/textures/mars.jpg";
import jupiterTextureImage from "../assets/images/textures/jupiter.jpg";
import saturnTextureImage from "../assets/images/textures/saturn.jpg";
import uranusTextureImage from "../assets/images/textures/uranus.jpg";
import neptuneTextureImage from "../assets/images/textures/neptune.jpg";
import exoplanetTextureImage from "../assets/images/textures/exoplanet.jpg";

const ExoplanetArchitect = () => {
  const [planetType, setPlanetType] = useState("earth");
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [showAtmosphere, setShowAtmosphere] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#1c1c1c"); // Changed to a darker color
  const [showStars, setShowStars] = useState(true); // Toggle stars around the globe
  const globeEl = useRef();
  const [stars, setStars] = useState([]);
  const [planetName, setPlanetName] = useState("MyExoplanet");

  // Get texture for the globe based on selected planet type
  const getGlobeTexture = () => {
    switch (planetType) {
      case "mercury":
        return mercuryTextureImage;
      case "venus":
        return venusTextureImage;
      case "earth":
        return earthTextureImage;
      case "mars":
        return marsTextureImage;
      case "jupiter":
        return jupiterTextureImage;
      case "saturn":
        return saturnTextureImage;
      case "uranus":
        return uranusTextureImage;
      case "neptune":
        return neptuneTextureImage;
      case "exoplanet":
        return exoplanetTextureImage;
      default:
        return exoplanetTextureImage;
    }
  };

  // Initialize the globe with rotation and settings
  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = rotationSpeed;
  }, [rotationSpeed]);

  // Function to generate stars around the globe
  const generateStars = (count = 200) => {
    const starsArray = [];
    for (let i = 0; i < count; i++) {
      starsArray.push({
        lat: (Math.random() * 180) - 90, // Random latitude between -90 and 90
        lng: (Math.random() * 360) - 180, // Random longitude between -180 and 180
        size: Math.random() * 3, // Random size of stars
      });
    }
    return starsArray;
  };

  // Generate stars when the component mounts or when showStars changes
  useEffect(() => {
    if (showStars) {
      setStars(generateStars(200));
    } else {
      setStars([]);
    }
  }, [showStars]);

  // Function to download the globe image
  const downloadGlobeImage = () => {
    if (!globeEl.current) return;

    // Temporarily pause auto-rotation
    const currentAutoRotate = globeEl.current.controls().autoRotate;
    globeEl.current.controls().autoRotate = false;

    // Force a render
    globeEl.current.renderer().render(globeEl.current.scene(), globeEl.current.camera());

    // Use the renderer's extract data URL method
    const imageData = globeEl.current.renderer().domElement.toDataURL('image/png');

    // Create a download link
    const link = document.createElement('a');
    link.href = imageData;
    link.download = `${planetName.replace(/\s+/g, '-')}-globe.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Restore auto-rotation
    globeEl.current.controls().autoRotate = currentAutoRotate;
  };

  return (
    <div 
      className="container-fluid d-flex flex-column justify-content-center align-items-center" 
      style={{ 
        width: '100vw',
        height: '100vh',
        background: `linear-gradient(135deg, rgba(240, 98, 146, 0.1), rgba(186, 104, 200, 0.1), rgba(100, 181, 246, 0.1), rgba(77, 182, 172, 0.1), rgba(255, 183, 77, 0.1), rgba(129, 199, 132, 0.1)), rgba(1, 5, 15, 0.95)`,
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      <div className="row w-100 justify-content-center" style={{ maxHeight: '95vh', overflowY: 'auto' }}>
        <div className="col-md-11">
          <div className="card text-white bg-transparent mb-3" >
            <div className="card-body" style={{ padding: '1rem' }}>
              <h1 className="text-center mb-3" style={{ fontSize: '1.8rem', fontWeight: "bold", color: "#81d4fa" }}>Design Your Exoplanet</h1>
              
              <div className="row">
                {/* Left side: Form controls */}
                <div className="col-md-6">
                  <div className="control-panel p-4 text-light rounded-lg shadow" >
                    <h3 className="text-center mb-4" style={{ color: "#81d4fa", fontWeight: "bold" }}>Planet Customization</h3>
                    
                    {/* Planet Texture Selector */}
                    <div className="mb-4">
                      <h5 className="text-info">Choose Planet Texture</h5>
                      <div className="planet-options d-flex flex-wrap justify-content-center">
                        {[
                          { name: "mercury", img: mercuryTextureImage },
                          { name: "venus", img: venusTextureImage },
                          { name: "earth", img: earthTextureImage },
                          { name: "mars", img: marsTextureImage },
                          { name: "jupiter", img: jupiterTextureImage },
                          { name: "saturn", img: saturnTextureImage },
                          { name: "uranus", img: uranusTextureImage },
                          { name: "neptune", img: neptuneTextureImage },
                          { name: "exoplanet", img: exoplanetTextureImage },
                        ].map((planet) => (
                          <div
                            key={planet.name}
                            className={`planet-option m-2 ${planetType === planet.name ? "selected" : ""}`}
                            onClick={() => setPlanetType(planet.name)}
                            style={{
                              border: planetType === planet.name ? "3px solid #81d4fa" : "none",
                              borderRadius: "50%",
                              padding: "5px",
                            }}
                          >
                            <img
                              src={planet.img}
                              alt={planet.name}
                              style={{ width: "60px", height: "60px", borderRadius: "50%", cursor: "pointer" }}
                            />
                            {/* <p className="text-center mt-1 text-capitalize text-white">{planet.name}</p> */}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Planet Name Input and Rotation Speed Control */}
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <h5 className="text-info">Planet Name</h5>
                        <input
                          type="text"
                          className="form-control"
                          value={planetName}
                          onChange={(e) => setPlanetName(e.target.value)}
                          placeholder="Enter planet name"
                          style={{ backgroundColor: "#222", borderColor: "#4fc3f7", color: "#81d4fa" }}
                        />
                      </div>
                      <div className="col-md-6">
                        <h5 className="text-info">Rotation Speed</h5>
                        <div className="d-flex align-items-center">
                          <input
                            type="range"
                            min="0.1"
                            max="2.0"
                            step="0.1"
                            value={rotationSpeed}
                            onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                            className="form-range flex-grow-1 me-3"
                            style={{ backgroundColor: "#81d4fa" }}
                          />
                          <span className="badge bg-primary">{rotationSpeed.toFixed(1)}x</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Toggle Controls and Background Color Picker */}
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <h5 className="text-info">Toggle Features</h5>
                        <div className="d-flex justify-content-between">
                          <button
                            className={`btn ${showAtmosphere ? 'btn-success' : 'btn-outline-light'}`}
                            onClick={() => setShowAtmosphere(!showAtmosphere)}
                          >
                            {showAtmosphere ? "Atmosphere On" : "Atmosphere Off"}
                          </button>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h5 className="text-info">Background Color</h5>
                        <div className="d-flex align-items-center">
                          <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="form-control form-control-color me-3"
                          />
                          <span className="text-white">{backgroundColor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Globe visualization */}
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                  <h2 className="text-center mb-4" style={{ color: "#81d4fa" }}>{planetName}</h2>
                  <div className="globe-container position-relative">
                    <div className="twinkling-star"></div>
                    <Globe
                      ref={globeEl}
                      globeImageUrl={getGlobeTexture()}
                      width={400}
                      height={400}
                      backgroundColor={backgroundColor}
                      atmosphereColor="#ffffff"
                      showAtmosphere={showAtmosphere}
                      pointsData={stars}
                      pointColor={() => "#ffffff"}
                      pointAltitude={0.001}
                      pointRadius={0.1}
                    />
                    {/* Download and Home buttons */}
                    <div className="position-absolute d-flex" style={{ bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                      <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        size="small"
                        onClick={downloadGlobeImage}
                        sx={{
                          backgroundColor: '#4caf50',
                          color: '#fff',
                          marginRight: '1rem',
                          '&:hover': {
                            backgroundColor: '#45a049',
                          },
                        }}
                      >
                        Download
                      </Button>
                      <Link to="/app" style={{ textDecoration: 'none' }}>
                        <Button
                          variant="contained"
                          startIcon={<HomeIcon />}
                          size="small"
                          sx={{
                            backgroundColor: '#ff4081',
                            color: '#fff',
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExoplanetArchitect;