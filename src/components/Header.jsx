import React from "react";
import logo from "../assets/images/logo.png";
import videoBg from "../assets/video/video-bg.mp4";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Button } from '@mui/material';
import { styled } from '@mui/system';

// Existing GradientButton styled component
const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 5,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 60,
  padding: '0 40px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  '&:hover': {
    background: 'linear-gradient(45deg, #FE8B8B 30%, #FF9E53 90%)',
  },
}));

// Updated ResponsiveHeader styled component
const ResponsiveHeader = styled('header')(({ theme }) => ({
  '& .vide_content': {
    padding: '20px',
  },
  '& .brand_name': {
    fontSize: '2.5rem',
  },
  '& .brand_slogan': {
    fontSize: '1.2rem',
  },
  '& h2': {
    fontSize: '2rem',
  },
  '& h3': {
    fontSize: '1.2rem',
  },
  // Media query for smaller laptops and larger tablets
  '@media (max-width: 1024px)': {
    '& .brand_name': {
      fontSize: '2.2rem',
    },
    '& .brand_slogan': {
      fontSize: '1.1rem',
    },
    '& h2': {
      fontSize: '1.9rem',
    },
    '& h3': {
      fontSize: '1.1rem',
    },
  },
  // Media query for medium devices (tablets)
  '@media (max-width: 768px)': {
    '& .brand_name': {
      fontSize: '2rem',
    },
    '& .brand_slogan': {
      fontSize: '1rem',
    },
    '& h2': {
      fontSize: '1.8rem',
    },
    '& h3': {
      fontSize: '1rem',
    },
  },
  // Media query for small devices (phones)
  '@media (max-width: 576px)': {
    '& .brand_name': {
      fontSize: '1.5rem',
    },
    '& .brand_slogan': {
      fontSize: '0.9rem',
    },
    '& h2': {
      fontSize: '1.5rem',
    },
    '& h3': {
      fontSize: '0.9rem',
    },
    '& .logo-img': {
      width: '60px',
      height: 'auto',
    },
  },
}));

function Header() {
  return (
    <ResponsiveHeader className="vide">
      {/* Background Video */}
      <video autoPlay muted loop className="background-video">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Background Overlay */}
      <div className="gradient-overlay"></div>

      {/* Transparent Navbar (Commented Out) */}
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-transparent fixed-top">
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
      </nav> */}

      <div className="container vide_content">
        <div className="brand">
          <img src={logo} alt="Logo" className="logo-img" />
          <h1 className="brand_name gradient-text">
            <a href="https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/teamcodecrackers/">Teamcodecrackers</a>
          </h1>
          <p className="brand_slogan gradient-text">NASA Space Apps Challenge</p>
        </div>

        <h2 className="gradient-text">Welcome to the Fascinating World of Exoplanets! 🌟</h2>
        <h3 className="text-white mb-5">
          Are you ready to explore worlds beyond our Solar System? 🌍✨ Our site is your gateway to discovering exoplanets—planets that orbit stars
          far away in distant galaxies.
        </h3>
        <GradientButton
          component={Link}
          to="/app"
          variant="contained"
          size="large"
        >
          Let's Explore
        </GradientButton>
      </div>
    </ResponsiveHeader>
  );
}

export default Header;
