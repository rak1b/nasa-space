// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer>
      {/* Footer content */}
      <div className="parallax" data-url="images/parallax2.jpg" data-mobile="true" data-speed="0.5">
        <div className="well4">
          <div className="container center">
            <hr />
            <h2>Professional web performance</h2>
            <h3>Creating something special for each customer</h3>
            <a className="btn" href="#">
              Get Started Now!
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
