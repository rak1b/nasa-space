// src/AppFooter.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/AppFooter.css'; // Custom CSS for styling

const AppFooter = () => {
  return (
    <footer className="app-footer">
      <div className="container text-center">
        <div className="footer-nav mb-3">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/basic-exoplanet" className="footer-link">Basic Exoplanets</Link>
          <Link to="/more-exoplanet" className="footer-link">More Exoplanets</Link>
          <Link to="/exoplanet-explorer" className="footer-link">Exoplanet Explorer</Link>
          <Link to="/exoplanet-architect" className="footer-link">Exoplanet Architect</Link>
        </div>
        <p className="footer-quote">
          "The universe is under no obligation to make sense to you." <br />
          <span>- Neil deGrasse Tyson</span>
        </p>
        {/* <div className="social-icons mt-3">
          <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">🐦</a>
          <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">📘</a>
          <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer">📸</a>
        </div> */}
        <p className="footer-credit mt-4">
          &copy; {new Date().getFullYear()} Exoplanet Explorer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
