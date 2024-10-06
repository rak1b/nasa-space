import  { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, Card, CardContent } from '@mui/material';

const Welcome = () => {
  const [explorerName, setExplorerName] = useState('');
  const navigate = useNavigate();
  const { step } = useParams();

  const handleNextClick = () => {
    switch (step) {
      case '1':
        navigate('/welcome/step2');
        break;
      case '2':
        if (explorerName.trim() !== '') {
          navigate('/welcome/step3');
        }
        break;
      case '3':
        navigate('/app');
        break;
      default:
        navigate('/welcome/step1');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent sx={{ textAlign: 'center', padding: '30px' }}>
          {step === '1' && (
            <>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/female-astronaut-cartoon.png`}
                alt="Female Astronaut"
                sx={{ width: '200px', height: '200px', objectFit: 'contain', marginBottom: '20px' }}
              />
              <Typography variant="h4" gutterBottom>Welcome, Space Explorer!</Typography>
              <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                Ready to uncover the secrets of distant worlds? Your exoplanet adventure begins now!
              </Typography>
            </>
          )}
          {step === '2' && (
            <>
              <Typography variant="h5" gutterBottom>What's your name, brave explorer?</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={explorerName}
                onChange={(e) => setExplorerName(e.target.value)}
                sx={{ marginBottom: '20px' }}
              />
            </>
          )}
          {step === '3' && (
            <>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/xara-guide-avatar.png`}
                alt="Xara Guide"
                sx={{ width: '150px', height: '150px', objectFit: 'contain', marginBottom: '20px' }}
              />
              <Typography variant="h4" gutterBottom>Hello, {explorerName}!</Typography>
              <Typography variant="h5" gutterBottom>I'm Xara, your cosmic guide.</Typography>
              <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                Together, we'll embark on an incredible journey through the stars and discover amazing exoplanets. Are you ready to explore the wonders of the universe?
              </Typography>
            </>
          )}
          <Button variant="contained" color="primary" onClick={handleNextClick}>
            {step === '1' ? 'Next' : step === '2' ? 'Meet Your Guide' : 'Start Exploring'}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Welcome;