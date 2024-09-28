import React from "react";
import hr8799 from "../assets/images/exoplanets/hr8799.jpg";
import betapictoris from "../assets/images/exoplanets/beta_pictorius.jpg";
import eridani from "../assets/images/exoplanets/eridani_b.jpg";
import formalhautb from "../assets/images/exoplanets/fomalhautb.jpg";
import wasp from "../assets/images/exoplanets/WASP-12b.webp";

const exoplanets = [
  {
    name: "HR 8799 b",
    description: "One of the first directly imaged exoplanets, orbiting the star HR 8799.",
    image_url: hr8799,
  },
  {
    name: "Beta Pictoris b",
    description: "A massive gas giant directly imaged orbiting the young star Beta Pictoris.",
    image_url: betapictoris,
  },
  {
    name: "51 Eridani b",
    description: "A young Jupiter-like exoplanet directly imaged around the star 51 Eridani.",
    image_url: eridani,
  },
  {
    name: "Fomalhaut b",
    description: "An exoplanet candidate in the Fomalhaut system, initially detected by the Hubble Space Telescope.",
    image_url: formalhautb,
  },
  {
    name: "WASP-12b",
    description: "A hot Jupiter exoplanet so close to its star that it is being distorted and consumed.",
    image_url: wasp,
  },
];

const BelowHeader = () => {
  return (
    <section
      className="d-flex align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "#00001a",
        color: "white",
        backgroundImage:
          "radial-gradient(circle, rgba(255, 255, 255, 0.1) 1%, transparent 1%), radial-gradient(circle, rgba(255, 255, 255, 0.1) 1%, transparent 1%)",
        backgroundSize: "4px 4px",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2>What is an Exoplanet?</h2>
            <p>
              An exoplanet is a planet that orbits a star outside of our solar system. Since the discovery of the first exoplanet in the 1990s,
              thousands have been identified, with new ones being found regularly. Some of these exoplanets might even have the right conditions
              to support life!
            </p>
            <p>
              Exoplanets come in various sizes and types, ranging from gas giants larger than Jupiter to rocky planets like Earth. These fascinating
              worlds are helping us understand the diversity of planetary systems in our galaxy and beyond.
            </p>
            {/* <a href="/components" className="btn btn-danger">
              See all components
            </a> */}
          </div>
          <div className="col-md-6">
            <div
              id="exoplanetCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
              style={{ height: "400px" }} // Set fixed height for the entire carousel
            >
              <div className="carousel-indicators">
                {exoplanets.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#exoplanetCarousel"
                    data-bs-slide-to={index}
                    className={index === 0 ? "active" : ""}
                    aria-current={index === 0 ? "true" : "false"}
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                ))}
              </div>
              <div className="carousel-inner" style={{ height: "100%" }}>
                {exoplanets.map((planet, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={planet.name}
                    style={{ height: "100%" }} // Ensure the item takes up the full height
                  >
                    <img
                      src={planet.image_url}
                      className="d-block w-100"
                      alt={planet.name}
                      style={{
                        height: "100%",
                        objectFit: "cover", // Ensure the image covers the area while maintaining aspect ratio
                      }}
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>{planet.name}</h5>
                      <p>{planet.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#exoplanetCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#exoplanetCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BelowHeader;
