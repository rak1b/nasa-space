import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Grid, Card, CardMedia, Container, CardContent, CardActions, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import QuizIcon from '@mui/icons-material/Quiz';
import { styled } from '@mui/material/styles';
import video1 from '../assets/video/ed_1.mp4';
import video2 from '../assets/video/ed_1.mp4';
import video3 from '../assets/video/ed_1.mp4';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(25, 118, 210, 0.08)', // Slight blue tint
  color: theme.palette.common.white,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const MoreExoplanet = () => {
  const [playingVideos, setPlayingVideos] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [thumbnails, setThumbnails] = useState({});

  const videos = [
    {
      id: 1,
      title: "Exoplanet Discovery Methods",
      description: "Learn about various techniques used to detect exoplanets.",
      url: video1,
    },
    {
      id: 2,
      title: "Exoplanet Types",
      description: "Explore the different types of exoplanets based on their composition and characteristics.",
      url: video2,
    },
    {
      id: 3,
      title: "Exoplanet Habitability",
      description: "Learn about the factors that make an exoplanet habitable for life.",
      url: video3,
    },
    {
      id: 4,
      title: "Exoplanet Habitability",
      description: "Learn about the factors that make an exoplanet habitable for life.",
      url: video3,
    },
  ];

  useEffect(() => {
    videos.forEach((video) => {
      const videoElement = document.createElement('video');
      videoElement.src = video.url;
      videoElement.preload = 'metadata';
      videoElement.onloadeddata = () => {
        videoElement.currentTime = 1; // Seek to 1 second
      };
      videoElement.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        setThumbnails(prev => ({
          ...prev,
          [video.id]: canvas.toDataURL()
        }));
      };
    });
  }, []);

  const handleVideoPlay = (videoId) => {
    setPlayingVideos(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
    setShowQuiz(false);
  };

  const handleQuizStart = () => {
    setShowQuiz(true);
    setPlayingVideos({});
  };

  return (
    <Container maxWidth="lg" sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      py: 4, 
      backgroundColor: '#0a1929', // Dark blue background
      color: 'common.white'
    }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: '#4fc3f7' /* Light blue */ }}>
        Learn More About Exoplanets
      </Typography>
      
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Grid container spacing={4}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <StyledCard>
                <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
                  {playingVideos[video.id] ? (
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                      <video
                        width="100%"
                        height="100%"
                        controls
                        autoPlay
                        src={video.url}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </Box>
                  ) : (
                    thumbnails[video.id] && (
                      <CardMedia
                        component="img"
                        image={thumbnails[video.id]}
                        alt={video.title}
                        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )
                  )}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#81d4fa' /* Lighter blue */ }}>
                    {video.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {video.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <IconButton 
                    sx={{ color: '#4fc3f7' /* Light blue */ }}
                    onClick={() => handleVideoPlay(video.id)}
                    aria-label={playingVideos[video.id] ? "Stop video" : "Play video"}
                  >
                    {playingVideos[video.id] ? <StopIcon /> : <PlayArrowIcon />}
                  </IconButton>
                  <IconButton 
                    sx={{ color: '#ff4081' /* Pink accent */ }}
                    onClick={handleQuizStart}
                    aria-label="Take quiz"
                  >
                    <QuizIcon />
                  </IconButton>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {showQuiz && (
          <Box sx={{ mt: 4, color: 'common.white' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#4fc3f7' /* Light blue */ }}>
              Exoplanet Quiz
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Quiz questions and answers will go here.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default MoreExoplanet;
