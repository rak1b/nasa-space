import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import video1 from '../assets/video/overview.mp4';

const ProjectOverview = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(240, 98, 146, 0.1), rgba(186, 104, 200, 0.1), rgba(100, 181, 246, 0.1), rgba(77, 182, 172, 0.1), rgba(255, 183, 77, 0.1), rgba(129, 199, 132, 0.1)), rgba(1, 5, 15, 0.95)',
      }}
    >
      <Container maxWidth="md">
        <Box my={6} textAlign="center">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, rgba(240, 98, 146, 1), rgba(186, 104, 200, 1), rgba(100, 181, 246, 1), rgba(77, 182, 172, 1), rgba(255, 183, 77, 1), rgba(129, 199, 132, 1))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
            }}
          >
            Project Overview
          </Typography>

          <Box mb={4} sx={{
            width: '80%',
            maxHeight: '60vh',
            margin: '0 auto',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            <video
              width="100%"
              height="100%"
              controls
              poster={`${process.env.PUBLIC_URL}/overview.png`}
              style={{ objectFit: 'contain' }}
            >
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>

          <Typography variant="body1" paragraph color="white" sx={{ maxWidth: '600px', margin: '0 auto' }}>
            Welcome to our project! This video provides an introduction to what we're working on.
            We're excited to share our progress and vision with you.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectOverview;
