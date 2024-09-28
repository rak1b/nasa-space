import React from 'react';
import { Link } from 'react-router-dom';
import parallaxImage from '../assets/images/parallax2.jpg'; // Adjust the path as needed

function NumberOfExoplanet() {
  return (
    <section
      className="position-relative d-flex align-items-center justify-content-center text-center"
      style={{
        backgroundImage: `url(${parallaxImage})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'white',
      }}
    >
      {/* Overlay for better text readability */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      ></div>

      <div className="container position-relative">
        <h1 className="display-4 mb-4">Over 5,500 Exoplanets Discovered!</h1>
        <p className="lead mb-5">
          Embark on a journey to explore the vast universe beyond our Solar System.
        </p>
        <Link className="btn btn-primary btn-lg" to="/exoplanets">
          See All Exoplanets
        </Link>
      </div>
    </section>
  );
}

export default NumberOfExoplanet;
