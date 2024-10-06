import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import HomeIcon from '@mui/icons-material/Home'
import SchoolIcon from '@mui/icons-material/School'
import ExploreIcon from '@mui/icons-material/Explore'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import GroupIcon from '@mui/icons-material/Group'
import EditIcon from '@mui/icons-material/Edit'
import { Stack, Fade, Button, TextField, IconButton } from '@mui/material';

const MainAppPage = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeStep, setWelcomeStep] = useState(1);
  const [explorerName, setExplorerName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('explorerName');
    if (savedName) {
      setExplorerName(savedName);
      setShowWelcome(false);
    }
  }, []);

  const navItems = [
    { title: 'Home', path: '/', icon: <HomeIcon fontSize="large" />, bgColor: '#f06292', hoverColor: '#e91e63' },
    { title: 'Basic Exoplanet', path: '/basic-exoplanet', icon: <SchoolIcon fontSize="large" />, bgColor: '#ba68c8', hoverColor: '#9c27b0' },
    { title: 'More Exoplanet', path: '/more-exoplanet', icon: <ExploreIcon fontSize="large" />, bgColor: '#64b5f6', hoverColor: '#2196f3' },
    { title: 'Exoplanet Architect', path: '/exoplanet-architect', icon: <ArchitectureIcon fontSize="large" />, bgColor: '#4db6ac', hoverColor: '#009688' },
    { title: 'Exoplanet Explorer', path: '/exoplanet-explorer', icon: <RocketLaunchIcon fontSize="large" />, bgColor: '#ffb74d', hoverColor: '#ff9800' },
    { title: 'Team', path: '/team', icon: <GroupIcon fontSize="large" />, bgColor: '#81c784', hoverColor: '#4caf50' },
  ];

  const silkscreenFont = {
    fontFamily: "'Silkscreen', cursive",
    fontWeight: 700,
  };

  const handleNextClick = () => {
    if (welcomeStep === 1) {
      setWelcomeStep(2);
    } else {
      localStorage.setItem('explorerName', explorerName);
      setShowWelcome(false);
    }
  };

  const handleEditName = () => {
    setIsEditing(true);
  };

  const handleSaveName = () => {
    localStorage.setItem('explorerName', explorerName);
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        padding: '10px',
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL}/bg.webp)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(240, 98, 146, 0.1), rgba(186, 104, 200, 0.1), rgba(100, 181, 246, 0.1), rgba(77, 182, 172, 0.1), rgba(255, 183, 77, 0.1), rgba(129, 199, 132, 0.1)), rgba(1, 5, 15, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          height: '95vh',
          width: '95vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
        }}
      >
        <Fade in={showWelcome} timeout={1000}>
          <Card
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: '400px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              zIndex: 10,
              display: showWelcome ? 'block' : 'none',
            }}
          >
            <CardContent sx={{ textAlign: 'center', padding: '30px' }}>
              {welcomeStep === 1 ? (
                <>
                  <Box
                    component="img"
                    src={`${process.env.PUBLIC_URL}/female-astronaut-cartoon.png`}
                    alt="Female Astronaut"
                    sx={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'contain',
                      marginBottom: '20px',
                    }}
                  />
                  <Typography variant="h4" component="div" gutterBottom sx={{ ...silkscreenFont, color: '#333' }}>
                    Welcome, Space Explorer!
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666', marginBottom: '20px' }}>
                    Ready to uncover the secrets of distant worlds? Your exoplanet adventure begins now!
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h5" component="div" gutterBottom sx={{ ...silkscreenFont, color: '#333' }}>
                    What's your name, brave explorer?
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={explorerName}
                    onChange={(e) => setExplorerName(e.target.value)}
                    sx={{ marginBottom: '20px' }}
                  />
                </>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextClick}
                sx={{ ...silkscreenFont }}
              >
                {welcomeStep === 1 ? 'Next' : 'Start Exploring'}
              </Button>
            </CardContent>
          </Card>
        </Fade>

        <Fade in={!showWelcome} timeout={1000}>
          <Stack direction="row" spacing={4} useFlexGap flexWrap="wrap" justifyContent="center">
            <Box sx={{ width: '100%', textAlign: 'center', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isEditing ? (
                <>
                  <TextField
                    value={explorerName}
                    onChange={(e) => setExplorerName(e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1, input: { color: 'white', ...silkscreenFont } }}
                  />
                  <Button onClick={handleSaveName} variant="contained" size="small" sx={{ ...silkscreenFont }}>
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6" sx={{ color: 'white', mr: 1, ...silkscreenFont }}>
                    Welcome back, {explorerName}!
                  </Typography>
                  <IconButton onClick={handleEditName} size="small" sx={{ color: 'white' }}>
                    <EditIcon />
                  </IconButton>
                </>
              )}
            </Box>
            {navItems.map((item, index) => (
              <Box key={item.path} flex="1 1 auto" minWidth={{ xs: '100%', sm: '45%', md: '30%' }} maxWidth="300px">
                <Link to={item.path} style={{ textDecoration: 'none' }}>
                  <Card
                    sx={{
                      backgroundColor: item.bgColor,
                      transition: '0.3s',
                      '&:hover': { 
                        transform: 'scale(1.05)', 
                        backgroundColor: item.hoverColor,
                      },
                      borderRadius: '15px',
                      overflow: 'hidden',
                      position: 'relative',
                      height: '200px',
                    }}
                  >
                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Box display="flex" flexDirection="column" alignItems="center" position="relative" zIndex="1">
                        {React.cloneElement(item.icon, { style: { color: '#ffffff', fontSize: '4rem' } })}
                        <Typography 
                          variant="h5" 
                          align="center" 
                          mt={2} 
                          sx={{ 
                            color: '#ffffff',
                            fontWeight: 700,
                            fontFamily: "'Baloo Bhai 2', cursive",
                            letterSpacing: '0.5px',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Box>
            ))}
          </Stack>
        </Fade>
      </Box>
    </Box>
  )
}

export default MainAppPage