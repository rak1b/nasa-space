import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Grid, Card, CardMedia, Container, CardContent, CardActions, IconButton, Radio, RadioGroup, FormControlLabel, FormControl, Modal } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import QuizIcon from '@mui/icons-material/Quiz';
import { styled } from '@mui/material/styles';
import video1 from '../assets/video/ed_1.mp4';
import video2 from '../assets/video/ed_1.mp4';
import video3 from '../assets/video/ed_1.mp4';

const StyledCard = styled(Card)(({ theme, bgcolor }) => ({
  background: bgcolor,
  color: theme.palette.text.primary,
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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [openQuizModal, setOpenQuizModal] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const videos = [
    {
      id: 1,
      title: "Exoplanet Discovery Methods",
      description: "Learn about various techniques used to detect exoplanets.",
      url: video1,
      bgcolor: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
    },
    {
      id: 2,
      title: "Exoplanet Types",
      description: "Explore the different types of exoplanets based on their composition and characteristics.",
      url: video2,
      bgcolor: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    },
    {
      id: 3,
      title: "Exoplanet Habitability",
      description: "Learn about the factors that make an exoplanet habitable for life.",
      url: video3,
      bgcolor: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
    },
    {
      id: 4,
      title: "Exoplanet Habitability",
      description: "Learn about the factors that make an exoplanet habitable for life.",
      url: video3,
      bgcolor: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
    },
  ];

  const questions = [
    {
      question: "What is the most common method for detecting exoplanets?",
      options: ["Direct imaging", "Transit method", "Radial velocity method", "Gravitational microlensing"],
      correctAnswer: "Transit method"
    },
    {
      question: "Which type of exoplanet is often referred to as a 'Super-Earth'?",
      options: ["Gas giant", "Ice giant", "Terrestrial planet larger than Earth", "Hot Jupiter"],
      correctAnswer: "Terrestrial planet larger than Earth"
    },
    {
      question: "What is the 'habitable zone' of a star?",
      options: ["The area where planets can form", "The region where liquid water can exist on a planet's surface", "The zone where stars are born", "The area where asteroids are most common"],
      correctAnswer: "The region where liquid water can exist on a planet's surface"
    }
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
    setOpenQuizModal(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer('');
    setAnswerSubmitted(false);
  };

  const handleCloseQuizModal = () => {
    setOpenQuizModal(false);
  };

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmitAnswer = () => {
    setAnswerSubmitted(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer('');
      setAnswerSubmitted(false);
    } else {
      setShowScore(true);
    }
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ 
      minHeight: '100vh', 
      width: '100vw',
      display: 'flex', 
      flexDirection: 'column', 
      py: 4, 
      px: '5vw', // Added horizontal padding
      backgroundImage: `linear-gradient(135deg, rgba(240, 98, 146, 0.1), rgba(186, 104, 200, 0.1), rgba(100, 181, 246, 0.1), rgba(77, 182, 172, 0.1), rgba(255, 183, 77, 0.1), rgba(129, 199, 132, 0.1)), url(${process.env.PUBLIC_URL}/bg.webp)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'rgba(1, 5, 15, 0.8)', // Changed from 0.95 to 0.8 for a less dark background
      backgroundBlendMode: 'overlay',
      color: '#FFFFFF'
    }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: '#4fc3f7' /* Light blue */ }}>
        Learn More About Exoplanets
      </Typography>
      
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Grid container spacing={4}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <StyledCard bgcolor={video.bgcolor}>
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
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' /* Darker text color */ }}>
                    {video.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' /* Darker description color */ }}>
                    {video.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button 
                    variant="contained"
                    sx={{ backgroundColor: '#4fc3f7', '&:hover': { backgroundColor: '#03a9f4' } }}
                    startIcon={<PlayArrowIcon />}
                    onClick={() => handleVideoPlay(video.id)}
                  >
                    Play Video
                  </Button>
                  <Button 
                    variant="contained"
                    sx={{ backgroundColor: '#ff4081', '&:hover': { backgroundColor: '#e91e63' } }}
                    startIcon={<QuizIcon />}
                    onClick={handleQuizStart}
                    aria-label="Take quiz"
                  >
                    Take a Quiz
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Quiz Modal Implementation */}
        <Modal
          open={openQuizModal}
          onClose={handleCloseQuizModal}
          aria-labelledby="quiz-modal"
          aria-describedby="exoplanet-quiz"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            {!showScore ? (
              <>
                <Typography variant="h5" gutterBottom sx={{ color: '#4fc3f7' }}>
                  Exoplanet Quiz
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>
                  {questions[currentQuestion].question}
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={selectedAnswer}
                    onChange={handleAnswerSelect}
                  >
                    {questions[currentQuestion].options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                        sx={{
                          color: answerSubmitted
                            ? option === questions[currentQuestion].correctAnswer
                              ? 'green'
                              : option === selectedAnswer
                              ? 'red'
                              : 'text.primary'
                            : 'text.primary'
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                {!answerSubmitted ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                    sx={{ mt: 2, backgroundColor: '#4fc3f7', '&:hover': { backgroundColor: '#03a9f4' } }}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNextQuestion}
                    sx={{ mt: 2, backgroundColor: '#4fc3f7', '&:hover': { backgroundColor: '#03a9f4' } }}
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </Button>
                )}
                {answerSubmitted && (
                  <Typography sx={{ mt: 2, color: selectedAnswer === questions[currentQuestion].correctAnswer ? 'green' : 'red' }}>
                    {selectedAnswer === questions[currentQuestion].correctAnswer
                      ? 'Correct!'
                      : `Incorrect. The correct answer is: ${questions[currentQuestion].correctAnswer}`}
                  </Typography>
                )}
              </>
            ) : (
              <>
                <Typography variant="h5" gutterBottom sx={{ color: '#4fc3f7' }}>
                  Quiz Complete!
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                  You scored {score} out of {questions.length}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleQuizStart}
                  sx={{ mt: 2, backgroundColor: '#4fc3f7', '&:hover': { backgroundColor: '#03a9f4' } }}
                >
                  Retake Quiz
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCloseQuizModal}
                  sx={{ mt: 2, ml: 2 }}
                >
                  Close
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default MoreExoplanet;
