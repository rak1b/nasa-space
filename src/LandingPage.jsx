// src/LandingPage.jsx
import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/NumberOfExoplanet';

// Import global CSS
import './assets/css/grid.css';
import './assets/css/style.css';
import './assets/css/booking.css';
import './assets/css/jquery.fancybox.css';
import './assets/css/owl-carousel.css';
import ExoplanetGlobe from './components/ExoplanetGlobe';
import ExoplanetSystem from './components/ExoplanetGlobe';
import MultipleGlobes from './components/ExoplanetGlobe';
import SingleExoplanet from './components/SingleExoplanet';
import NumberOfExoplanetCard from './components/NumberOfExoplanet';
import BelowHeader from './components/BelowHeader';
import HowManyExoplanet from './components/HowManyExoplanet';

function LandingPage() {
  return (
    <div className="page">
      <Header />
      <BelowHeader />
      {/* <MainContent /> */}
      {/* <SingleExoplanet /> */}
      {/* <MultipleGlobes />
      <NumberOfExoplanetCard /> */}
      <HowManyExoplanet/>
    </div>
  );
}

export default LandingPage;
