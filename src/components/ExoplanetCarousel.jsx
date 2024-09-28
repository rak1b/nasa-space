import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const exoplanets = [
  {
    "name": "HR 8799 b",
    "description": "One of the first directly imaged exoplanets, orbiting the star HR 8799.",
    "image_url": "https://exoplanets.nasa.gov/resources/2082/direct-image-of-exoplanets-around-hr-8799/"
  },
  {
    "name": "Beta Pictoris b",
    "description": "A massive gas giant directly imaged orbiting the young star Beta Pictoris.",
    "image_url": "https://www.eso.org/public/images/eso1024b/"
  },
  {
    "name": "51 Eridani b",
    "description": "A young Jupiter-like exoplanet directly imaged around the star 51 Eridani.",
    "image_url": "https://exoplanets.nasa.gov/resources/524/51-eridani-b/"
  },
  {
    "name": "Fomalhaut b",
    "description": "An exoplanet candidate in the Fomalhaut system, initially detected by the Hubble Space Telescope.",
    "image_url": "https://exoplanets.nasa.gov/resources/1939/hubble-images-possible-exoplanet-fomalhaut-b/"
  },
  {
    "name": "WASP-12b",
    "description": "A hot Jupiter exoplanet so close to its star that it is being distorted and consumed.",
    "image_url": "https://www.nasa.gov/sites/default/files/thumbnails/image/pia19966-hubble.jpg"
  }
];

const ExoplanetCarousel = () => {
  return (
    <div id="exoplanetCarousel" className="carousel slide" data-bs-ride="carousel">
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
      <div className="carousel-inner">
        {exoplanets.map((planet, index) => (
          <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={planet.name}>
            <img src={planet.image_url} className="d-block w-100" alt={planet.name} />
            <div className="carousel-caption d-none d-md-block">
              <h5>{planet.name}</h5>
              <p>{planet.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#exoplanetCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#exoplanetCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ExoplanetCarousel;
