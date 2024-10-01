import React from "react";
import logo from "../assets/images/logo.png";
import videoBg from "../assets/video/video-bg.mp4";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
function Header() {
  return (
    <header className="vide">
      {/* Background Video */}
      <video autoPlay muted loop className="background-video">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Transparent Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="./">
            <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-top" />
            Teamcodecrackers
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <ScrollLink
                  className="nav-link text-white"
                  to="what_is_exoplanet_section"
                  smooth={true}
                  duration={500}
                  offset={-70} // Adjust offset for fixed navbar
                >
                  What is Exoplanet
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink className="nav-link text-white" to="why_exoplanet" smooth={true} duration={500} offset={-70}>
                  Why Exoplanet
                </ScrollLink>
              </li>
              <li className="nav-item">
 
                <ScrollLink className="nav-link text-white" to="how_many_exoplanet" smooth={true} duration={500} offset={-70}>
                How Many
                </ScrollLink>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/exoplanets">
                  Explore All
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container vide_content">
        <div className="brand">
          <img src={logo} alt="" />
          <h1 className="brand_name">
            <a href="https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/teamcodecrackers/">Teamcodecrackers</a>
          </h1>
          <p className="brand_slogan">NASA Space Apps Challenge</p>
        </div>

        <h2>Welcome to the Fascinating World of Exoplanets! 🌟</h2>
        <h3>
          Are you ready to explore worlds beyond our Solar System? 🌍✨ Our site is your gateway to discovering exoplanets—planets that orbit stars
          far away in distant galaxies.
        </h3>
      </div>
    </header>
  );
}

export default Header;
