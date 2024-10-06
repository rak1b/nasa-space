import React from 'react'
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
import ContactMailIcon from '@mui/icons-material/ContactMail'
import EventIcon from '@mui/icons-material/Event'
import GroupIcon from '@mui/icons-material/Group'
import { Stack } from '@mui/material';

const MainAppPage = () => {
  const navItems = [
    { title: 'Home', path: '/', icon: <HomeIcon fontSize="large" /> },
    { title: 'Basic Exoplanet', path: '/basic-exoplanet', icon: <SchoolIcon fontSize="large" /> },
    { title: 'More Exoplanet', path: '/more-exoplanet', icon: <ExploreIcon fontSize="large" /> },
    { title: 'Exoplanet Architect', path: '/exoplanet-architect', icon: <ArchitectureIcon fontSize="large" /> },
    { title: 'Exoplanet Explorer', path: '/exoplanet-explorer', icon: <RocketLaunchIcon fontSize="large" /> },
    { title: 'Team', path: '/team', icon: <GroupIcon fontSize="large" /> },
  ]

  return (
    <Box
      sx={{
        padding: '10px',
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL}/bg_dark.webp)`,
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
          backgroundColor: 'rgba(1, 5, 15, 0.95)', // #000D25 with 80% opacity
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
        <Stack direction="row" spacing={4} useFlexGap flexWrap="wrap" justifyContent="center">
          {navItems.map((item, index) => (
            <Box key={item.path} flex="1 1 auto" minWidth={{ xs: '100%', sm: '45%', md: '30%' }} maxWidth="300px">
              <Link to={item.path} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transition: '0.3s',
                    '&:hover': { 
                      transform: 'scale(1.05)', 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)'
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
                          fontWeight: 'bold',
                          fontFamily: "'Montserrat', sans-serif",
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
      </Box>
    </Box>
  )
}

export default MainAppPage
