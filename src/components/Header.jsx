// src/components/Header.jsx
import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import videoBg from '../assets/video/video-bg.mp4';

import "../index.css"
// Import the video file
function Header() {


  return (
    <header className="vide">
      {/* Background Video */}
       <video autoPlay muted loop className="background-video"> */}
      <source src={videoBg} type="video/mp4" />
              Your browser does not support the video tag.
      </video>
      
      {/* <video class="homeVideoElement _volume-boosted" className="background-video"  autoplay="" loop="" playsinline="" preload="auto" src={videoBg} type="video/mp4" crossorigin="anonymous" __idm_id__="2506753"></video> */}
      <div className="container vide_content">
        <div className="brand">
          <img src={logo} alt="" />

          <h1 className="brand_name">
            <a href="./">Teamcodecrackers</a>
          </h1>
          <p className="brand_slogan">NASA Space Apps Challenge</p>
        </div>

        <h2>Welcome to the Fascinating World of Exoplanets! 🌟</h2>

        <h3>Are you ready to explore worlds beyond our Solar System? 🌍✨ Our site is your gateway to discovering exoplanets—planets that orbit stars far away in distant galaxies.</h3>


      </div>
    </header>
  );
}

export default Header;
