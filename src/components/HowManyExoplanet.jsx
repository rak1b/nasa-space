import React from "react";
import ExoplanetSystem from "./ExoplanetGlobe";
import NumberOfExoplanet from "./NumberOfExoplanet";

const HowManyExoplanet = () => {

  return (
    <section
      className="d-flex align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "#000011", // Dark space-like color
        color: "white",
        padding: "2rem",
      }}
    >
      <div className="container h-100"> {/* Added 'h-100' class */}
        <div className="row align-items-center h-100"> {/* Added 'h-100' class */}
          {/* Left side: Exoplanet System */}
          <div className="col-md-6 h-100" style={{ position: 'relative' }}> {/* Added 'h-100' class and 'position: relative' */}
            <ExoplanetSystem />
          </div>

          {/* Right side: Information */}
          <div className="col-md-6">
            <NumberOfExoplanet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowManyExoplanet;
