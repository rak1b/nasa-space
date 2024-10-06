import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid, Container, Box } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const Teams = () => {
  const teamMembers = [
    { name: "Nabila Hussain Zara", bgColor: '#f06292', hoverColor: '#e91e63' },
    { name: "Md Rakibul Islam", bgColor: '#ba68c8', hoverColor: '#9c27b0' },
    { name: "Tufayel Ahmed", bgColor: '#64b5f6', hoverColor: '#2196f3' },
    { name: "Sumaiya Hussain", bgColor: '#4db6ac', hoverColor: '#009688' },
    { name: "Shahid Ahmed", bgColor: '#ffb74d', hoverColor: '#ff9800' },
  ];

  const silkscreenFont = {
    fontFamily: "'Silkscreen', cursive",
    fontWeight: 700,
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(240, 98, 146, 0.1), rgba(186, 104, 200, 0.1), rgba(100, 181, 246, 0.1), rgba(77, 182, 172, 0.1), rgba(255, 183, 77, 0.1), rgba(129, 199, 132, 0.1)), rgba(1, 5, 15, 0.95)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
          sx={{
            my: 4,
            color: 'white',
            fontWeight: 'bold',
            ...silkscreenFont,
          }}
        >
          Our Team
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item key={index}>
              <Card
                sx={{
                  width: 200,
                  height: 180,
                  backgroundColor: member.bgColor, // Use bgColor for each member
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: '0.3s',
                  borderRadius: '15px',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    backgroundColor: member.hoverColor, // Use hoverColor for each member
                    boxShadow: '0 10px 20px rgba(0,0,0,0.3)', // Add shadow on hover
                  },
                }}
              >
                <Avatar sx={{ bgcolor: 'white', color: member.hoverColor, width: 56, height: 56, mb: 1 }}>
                  <PersonIcon />
                </Avatar>
                <CardContent>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontFamily: "'Baloo Bhai 2', cursive",
                      letterSpacing: '0.5px',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    {member.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Teams;