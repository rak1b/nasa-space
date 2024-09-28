// src/AppFooter.js

import React from 'react';
import '../assets/css/AppFooter.css'; // Custom CSS for styling

const AppFooter = () => {
  return (
    <footer className="app-footer">
      <div className="container text-center">
        <div className="footer-nav mb-3">
          <a href="/" className="footer-link">Home</a>
          <a href="/importance" className="footer-link">Why Exoplanets?</a>
          <a href="/visualizer" className="footer-link">Visualizer</a>
          <a href="/contact" className="footer-link">Contact</a>
        </div>
        <p className="footer-quote">
          "The universe is under no obligation to make sense to you." <br />
          <span>- Neil deGrasse Tyson</span>
        </p>
        <div className="social-icons mt-3">
          <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">🐦</a>
          <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">📘</a>
          <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer">📸</a>
        </div>
        <p className="footer-credit mt-4">
          &copy; {new Date().getFullYear()} Exoplanet Explorer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
