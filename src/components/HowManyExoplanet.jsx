import React from "react";
import ExoplanetSystem from "./ExoplanetGlobe";
import NumberOfExoplanet from "./NumberOfExoplanet";

const HowManyExoplanet = () => {
  return (
    <section
      id="how_many_exoplanet"
      className="d-flex align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "#000011", // Dark space-like color
        color: "white",
        padding: "2rem",
      }}
    >
      <div className="container h-100">
        <div className="row align-items-center h-100">
          {/* Left side: Exoplanet System */}
          <div
            className="col-lg-6 col-md-12 mb-4 mb-lg-0"
            style={{ position: "relative", height: "50vh" }}
          >
            <ExoplanetSystem />
          </div>

          {/* Right side: Information */}
          <div className="col-lg-6 col-md-12">
            <NumberOfExoplanet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowManyExoplanet;
