// src/LandingPage.jsx
import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

// Import global CSS
import './assets/css/grid.css';
import './assets/css/style.css';
import './assets/css/booking.css';
import './assets/css/jquery.fancybox.css';
import './assets/css/owl-carousel.css';
import Description from './components/Description';
import 'bootstrap/dist/css/bootstrap.min.css';

function LandingPage() {
  return (
    <div className="page">
      <Header />
      <MainContent />
      <Description/>
      <Footer />
    </div>
  );
}

export default LandingPage;
