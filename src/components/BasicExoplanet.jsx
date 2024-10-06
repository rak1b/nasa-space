import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material/styles';
import BelowHeader from './BelowHeader';
import ExoplanetEducation from './ExoplanetEducation';
import HowManyExoplanet from './HowManyExoplanet';

const NavyButton = styled(Button)({
  backgroundColor: '#000080', // Navy blue
  color: '#FFFFFF', // White
  '&:hover': {
    backgroundColor: '#0000B0', // Slightly lighter navy blue
  },
});

function LandingPage() {
  const [currentComponent, setCurrentComponent] = useState(0);

  const components = [
    <BelowHeader key="belowHeader" />,
    <ExoplanetEducation key="exoplanetEducation" />,
    <HowManyExoplanet key="howManyExoplanet" />
  ];

  const handleNext = () => {
    setCurrentComponent((prev) => (prev + 1) % components.length);
  };

  const handlePrevious = () => {
    setCurrentComponent((prev) => (prev - 1 + components.length) % components.length);
  };

  const handleHome = () => {
    setCurrentComponent(0);
  };

  return (
    <div className="relative min-h-screen" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/bg.webp)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'linear-gradient(135deg, rgba(240, 98, 146, 0.1), rgba(186, 104, 200, 0.1), rgba(100, 181, 246, 0.1), rgba(77, 182, 172, 0.1), rgba(255, 183, 77, 0.1), rgba(129, 199, 132, 0.1)),rgba(1, 5, 15, 0.95)', // Keeping the dark background color
      backgroundBlendMode: 'overlay', // This will blend the image with the background color
      color: '#FFFFFF'
    }}>
      <div className="mb-16 w-75 m-auto" style={{ padding: '10px', height: '90vh' }}>
        {components[currentComponent]}
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        <NavyButton variant="contained" onClick={handlePrevious} startIcon={<ArrowBackIcon />}>
          Previous
        </NavyButton>
        {/* <NavyButton variant="contained" onClick={handleHome} startIcon={<HomeIcon />}>
          Home
        </NavyButton> */}
        <NavyButton variant="contained" onClick={handleNext} endIcon={<ArrowForwardIcon />}>
          Next
        </NavyButton>
      </Box>
    </div>
  );
}

export default LandingPage;
