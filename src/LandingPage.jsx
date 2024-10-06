// src/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Typography, Modal } from '@mui/material';
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
import ExoplanetVisualizer from './components/ExoplanetVisualizer';
import ExoplanetEducation from './components/ExoplanetEducation';
import AppFooter from './components/AppFooter';
import ExoplanetArchitect from './components/ExoplanetArchitect';
import ProjectOverview from './components/ProjectOverview';
import Teams from './components/Teams';

function LandingPage() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('hasVisited', 'true');
    } else {
      setShowContent(true);
    }
  }, []);

  const handleStartExploring = () => {
    setShowWelcome(false);
    setShowContent(true);
  };

  const silkscreenFont = {
    fontFamily: 'Silkscreen, cursive',
  };

  return (
    <div className="">
      <Header />
      <Modal
        open={showWelcome}
        aria-labelledby="welcome-modal"
        aria-describedby="welcome-modal-description"
      >
        <Card sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
        }}>
          <CardContent sx={{ textAlign: 'center', padding: '40px' }}>
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/female-astronaut-cartoon.png`}
              alt="Female Astronaut"
              sx={{
                width: '250px',
                height: '250px',
                objectFit: 'contain',
                marginBottom: '30px',
              }}
            />
            <Typography variant="h3" component="div" gutterBottom sx={{ ...silkscreenFont, color: '#333', marginBottom: '20px' }}>
              Hello, Explorer!
            </Typography>
            <Typography variant="h6" sx={{ color: '#666', marginBottom: '30px' }}>
              I'm Xara, your cosmic companion! Together, we'll journey through the stars and uncover the mysteries of distant worlds. Are you ready to explore the wonders of exoplanets?
            </Typography>
            <Button
              variant="contained"
              onClick={handleStartExploring}
              sx={{
                ...silkscreenFont,
                fontSize: '1.2rem',
                padding: '12px 24px',
                borderRadius: '50px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                backgroundColor: '#000080', // Navy blue
                color: 'white',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
                  backgroundColor: '#0000b3', // Slightly lighter navy blue on hover
                }
              }}
            >
              Start Exploring
            </Button>
          </CardContent>
        </Card>
      </Modal>
      
      {showContent && (
        <>
          <ProjectOverview/>
          <Teams/>
          <HowManyExoplanet/>
          <AppFooter/>
        </>
      )}
    </div>
  );
}

export default LandingPage;
