import React, { useState, useRef, useEffect } from "react";
import Globe from "react-globe.gl";
import { Tooltip } from "react-tooltip";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Main Component
const ExoplanetArchitect = () => {
  const [planetType, setPlanetType] = useState("rocky");
  const [atmosphere, setAtmosphere] = useState("thin");
  const [gravity, setGravity] = useState(1.0);
  const [surfaceItems, setSurfaceItems] = useState([]);
  const globeEl = useRef();

  // Function to evaluate habitability based on selected options
  const evaluateHabitability = (planetType, atmosphere, gravity) => {
    if (planetType === "rocky" && atmosphere === "thick" && gravity > 0.5) {
      return "High chance of life";
    } else {
      return "Unlikely to support life";
    }
  };

  const habitability = evaluateHabitability(planetType, atmosphere, gravity);

  // Add surface features like Volcano, Ocean, Ring
  const addSurfaceItem = (item) => {
    if (!surfaceItems.includes(item)) {
      setSurfaceItems([...surfaceItems, item]);
    }
  };

  // Remove surface feature
  const removeSurfaceItem = (item) => {
    setSurfaceItems(surfaceItems.filter((i) => i !== item));
  };

  // Configure globe texture based on planet type
  const getGlobeTexture = () => {
    switch (planetType) {
      case "rocky":
        return "https://upload.wikimedia.org/wikipedia/commons/c/c5/Mars_map.JPG"; // Mars texture
      case "gaseous":
        return "https://upload.wikimedia.org/wikipedia/commons/e/e7/Jupiter_from_Cassini_%28updated%29.jpg"; // Jupiter texture
      case "icy":
        return "https://upload.wikimedia.org/wikipedia/commons/8/8f/Ceres_-_RC3_-_Haulani_Crater_%2822381131691%29.jpg"; // Icy surface texture
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/c/c5/Mars_map.JPG";
    }
  };

  // Initialize and set up the globe
  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.5;
  }, []);

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="row w-100 h-100">
        {/* Left side: Form controls */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center overflow-auto">
          <h1 className="text-center mb-4">Design Your Exoplanet</h1>

          <div className="row w-100">
            {/* Planet Type Selector */}
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <h4>Planet Type</h4>
                <select
                  value={planetType}
                  onChange={(e) => setPlanetType(e.target.value)}
                  className="form-control"
                >
                  <option value="rocky">Rocky</option>
                  <option value="gaseous">Gaseous</option>
                  <option value="icy">Icy</option>
                </select>
              </div>
            </div>

            {/* Atmosphere Selector */}
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <h4>Atmosphere</h4>
                <select
                  value={atmosphere}
                  onChange={(e) => setAtmosphere(e.target.value)}
                  className="form-control"
                >
                  <option value="thin">Thin</option>
                  <option value="thick">Thick</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>

            {/* Gravity Selector */}
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <h4>Gravity</h4>
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  value={gravity}
                  onChange={(e) => setGravity(parseFloat(e.target.value))}
                  className="form-range"
                />
                <p>Gravity: {gravity.toFixed(1)}g</p>
              </div>
            </div>
          </div>

          {/* Surface Features Buttons */}
          <div className="mt-2">
            <h4>Add Surface Features</h4>
            <button className="btn btn-primary m-2" onClick={() => addSurfaceItem("Volcano")}>
              Add Volcano
            </button>
            <button className="btn btn-primary m-2" onClick={() => addSurfaceItem("Ocean")}>
              Add Ocean
            </button>
            <button className="btn btn-primary m-2" onClick={() => addSurfaceItem("Ring")}>
              Add Ring
            </button>
          </div>

          <div className="mt-2">
            <h4>Remove Surface Features</h4>
            <button className="btn btn-danger m-2" onClick={() => removeSurfaceItem("Volcano")}>
              Remove Volcano
            </button>
            <button className="btn btn-danger m-2" onClick={() => removeSurfaceItem("Ocean")}>
              Remove Ocean
            </button>
            <button className="btn btn-danger m-2" onClick={() => removeSurfaceItem("Ring")}>
              Remove Ring
            </button>
          </div>
        </div>

        {/* Right side: Globe visualization */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-center mb-4">Your Planet</h1>
          <div className="globe-container">
            <Globe
              ref={globeEl}
              globeImageUrl={getGlobeTexture()} // Set texture based on planet type
              width={500}
              height={500}
            />
            <div className="mt-4">
              <h2 className="text-center">Habitability Feedback</h2>
              <p className="text-center">{habitability}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExoplanetArchitect;
