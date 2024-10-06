import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Tooltip } from "react-tooltip";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

// Main Component
const ExoplanetArchitect = () => {
  const [planetType, setPlanetType] = useState("rocky");
  const [atmosphere, setAtmosphere] = useState("thin");
  const [gravity, setGravity] = useState(1.0);
  const [surfaceItems, setSurfaceItems] = useState([]);

  // Function to evaluate habitability based on selected options
  const evaluateHabitability = (planetType, atmosphere, gravity) => {
    if (planetType === "rocky" && atmosphere === "thick" && gravity > 0.5) {
      return "High chance of life";
    } else {
      return "Unlikely to support life";
    }
  };

  const habitability = evaluateHabitability(planetType, atmosphere, gravity);

  // Handle drop logic for surface elements (like volcanoes, oceans)
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "SURFACE_ITEM",
    drop: (item) => addSurfaceItem(item.name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addSurfaceItem = (item) => {
    setSurfaceItems((prevItems) => [...prevItems, item]);
  };

  // Function to get a simple visual representation of the planet
  const getPlanetRepresentation = () => {
    return (
      <div className="planet-visualization text-center">
        <div
          className={`planet ${planetType}`}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            backgroundColor: planetType === "rocky" ? "#8B4513" : planetType === "gaseous" ? "#ADD8E6" : "#00BFFF",
            position: "relative",
          }}
        >
          {surfaceItems.includes("Volcano") && (
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "red",
                borderRadius: "50%",
                position: "absolute",
                top: "50px",
                left: "80px",
              }}
            ></div>
          )}
          {surfaceItems.includes("Ocean") && (
            <div
              style={{
                width: "100px",
                height: "50px",
                backgroundColor: "#1E90FF",
                borderRadius: "50%",
                position: "absolute",
                bottom: "10px",
                left: "50px",
              }}
            ></div>
          )}
          {surfaceItems.includes("Ring") && (
            <div
              style={{
                width: "240px",
                height: "240px",
                borderRadius: "50%",
                border: "5px solid #CCCCCC",
                position: "absolute",
                top: "-20px",
                left: "-20px",
              }}
            ></div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row my-4">
        {/* Left side: Form controls */}
        <div className="col-md-6">
          <h1 className="text-center my-4">Design Your Exoplanet</h1>

          <div className="row">
            {/* Planet Type Selector */}
            <div className="col-md-12 mb-4">
              <div className="form-group">
                <h3>Planet Type</h3>
                <select
                  value={planetType}
                  onChange={(e) => setPlanetType(e.target.value)}
                  className="form-control"
                >
                  <option value="rocky">Rocky</option>
                  <option value="gaseous">Gaseous</option>
                  <option value="icy">Icy</option>
                </select>
                <p id="planetInfo" className="mt-2">
                  Planet Types Info
                </p>
                <Tooltip anchorSelect="#planetInfo">
                  Rocky planets are solid, like Earth. Gaseous planets have no
                  solid surface.
                </Tooltip>
              </div>
            </div>

            {/* Atmosphere Selector */}
            <div className="col-md-12 mb-4">
              <div className="form-group">
                <h3>Atmosphere</h3>
                <select
                  value={atmosphere}
                  onChange={(e) => setAtmosphere(e.target.value)}
                  className="form-control"
                >
                  <option value="thin">Thin</option>
                  <option value="thick">Thick</option>
                  <option value="none">None</option>
                </select>
                <p id="atmosphereInfo" className="mt-2">
                  Atmosphere Info
                </p>
                <Tooltip anchorSelect="#atmosphereInfo">
                  Thicker atmospheres help protect planets from radiation and
                  retain heat.
                </Tooltip>
              </div>
            </div>

            {/* Gravity Selector */}
            <div className="col-md-12 mb-4">
              <div className="form-group">
                <h3>Gravity</h3>
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
                <p id="gravityInfo" className="mt-2">
                  Gravity Info
                </p>
                <Tooltip anchorSelect="#gravityInfo">
                  Higher gravity means a stronger atmosphere, but it can make
                  movement difficult.
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Drag-and-Drop Surface */}
          <div
            ref={drop}
            className={`col-md-12 surface-drop-zone p-4 mb-4 ${
              isOver ? "bg-success" : "bg-light"
            }`}
            style={{ border: "2px dashed gray", minHeight: "150px" }}
          >
            <h3>Surface Features (Drag to add)</h3>
            <p>{surfaceItems.join(", ") || "No features added"}</p>
          </div>

          <div className="row">
            {/* Draggable Surface Items */}
            <div className="col-md-4">
              <DraggableSurfaceItem name="Volcano" />
            </div>
            <div className="col-md-4">
              <DraggableSurfaceItem name="Ocean" />
            </div>
            <div className="col-md-4">
              <DraggableSurfaceItem name="Ring" />
            </div>
          </div>
        </div>

        {/* Right side: Planet visualization */}
        <div className="col-md-6">
          <h1 className="text-center my-4">Your Planet</h1>
          <div className="planet-visualizer">
            {getPlanetRepresentation()}
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

// Draggable Item Component
const DraggableSurfaceItem = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "SURFACE_ITEM",
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="bg-secondary text-white text-center py-2 mb-3"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {name}
    </div>
  );
};

export default ExoplanetArchitect;
