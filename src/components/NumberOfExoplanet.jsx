import React from 'react';

function Footer() {
  return (
    <footer>
      {/* Footer content */}
      <div className="parallax" data-url="images/parallax2.jpg" data-mobile="true" data-speed="0.5">
        <div className="well4">
          <div className="container center">
            <hr />
            <h2>Over 5,500 Exoplanets Discovered!</h2>
            <h3>Explore the vast universe beyond our Solar System</h3>
            <a className="btn" href="/all_exoplanet" target="_blank" rel="noopener noreferrer">
              See All Exoplanets
            </a>
            <div className="copyright">
              © {new Date().getFullYear()} Your Logo. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
      {/* ... Rest of your footer */}
    </footer>
  );
}

export default Footer;
