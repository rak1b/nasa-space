import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Grid, Card, CardMedia, Container, CardContent, CardActions, IconButton, Radio, RadioGroup, FormControlLabel, FormControl, Modal } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import QuizIcon from '@mui/icons-material/Quiz';
import { styled } from '@mui/material/styles';
import video1 from '../assets/video/ed_1.mp4';
import video2 from '../assets/video/ed_2.mp4';
import video3 from '../assets/video/ed_3.mp4';

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
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizReady, setQuizReady] = useState(false);

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
  ];

  const questions = [
    {
      question: "What is the approximate size of Kepler-62F compared to Earth?",
      options: ["20% larger", "40% larger", "60% larger", "80% larger"],
      correctAnswer: "40% larger"
    },
    {
      question: "How far is Kepler-186F from Earth?",
      options: ["300 light-years", "500 light-years", "1,200 light-years", "2,700 light-years"],
      correctAnswer: "500 light-years"
    },
    {
      question: "In what zone does Kepler-69F orbit its star?",
      options: ["Ice zone", "Habitable zone", "Dark zone", "Gas zone"],
      correctAnswer: "Habitable zone"
    },
    {
      question: "How many times larger than Earth is Kepler-22b?",
      options: ["2 times", "3 times", "1.5 times", "4 times"],
      correctAnswer: "2 times"
    },
    {
      question: "What is the mass of Gliese 667Cc compared to Earth?",
      options: ["2.5 times", "3 times", "4.5 times", "6 times"],
      correctAnswer: "4.5 times"
    },
    {
      question: "What is HD 209458b also known as?",
      options: ["Neptune", "Osiris", "Orion", "Jupiter II"],
      correctAnswer: "Osiris"
    },
    {
      question: "51 Pegasi b was the first exoplanet discovered orbiting what type of star?",
      options: ["Red Dwarf", "Binary Star", "Sun-like Star", "Supernova"],
      correctAnswer: "Sun-like Star"
    },
    {
      question: "How far is Proxima Centauri b from Earth?",
      options: ["4.2 light-years", "6 light-years", "10 light-years", "12 light-years"],
      correctAnswer: "4.2 light-years"
    },
    {
      question: "How many Earth-sized planets are in the TRAPPIST-1 system?",
      options: ["3", "5", "7", "9"],
      correctAnswer: "7"
    },
    {
      question: "What is the estimated surface temperature of K2-18b?",
      options: ["-50°C", "0°C", "10°C", "50°C"],
      correctAnswer: "10°C"
    },
    {
      question: "Which exoplanet is nicknamed 'Super Earth'?",
      options: ["Kepler-452b", "HD 40307g", "Gliese 581g", "TOI 700d"],
      correctAnswer: "HD 40307g"
    },
    {
      question: "What is unique about PSR B1620-26 b?",
      options: ["It's a gas giant", "It orbits two stars", "It's the oldest known exoplanet", "It's the smallest exoplanet"],
      correctAnswer: "It's the oldest known exoplanet"
    },
    {
      question: "Which exoplanet is known for its extreme surface temperatures?",
      options: ["KELT-9b", "WASP-12b", "HD 189733b", "TrES-2b"],
      correctAnswer: "KELT-9b"
    },
    {
      question: "What is the estimated age of the exoplanet Methuselah (PSR B1620-26 b)?",
      options: ["5 billion years", "8 billion years", "10 billion years", "13 billion years"],
      correctAnswer: "13 billion years"
    },
    {
      question: "Which exoplanet is believed to have a surface covered in burning ice?",
      options: ["Gliese 436 b", "55 Cancri e", "HD 209458 b", "WASP-12b"],
      correctAnswer: "Gliese 436 b"
    }
  ];

  // Function to get 5 random questions
  const getRandomQuestions = (allQuestions, count) => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

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
    const selectedQuestions = getRandomQuestions(questions, 5);
    setQuizQuestions(selectedQuestions);
    setOpenQuizModal(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer('');
    setAnswerSubmitted(false);
    setQuizReady(true);
  };

  const handleCloseQuizModal = () => {
    setOpenQuizModal(false);
  };

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmitAnswer = () => {
    setAnswerSubmitted(true);
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
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
            {!showScore && quizReady ? (
              <>
                <Typography variant="h5" gutterBottom sx={{ color: '#4fc3f7' }}>
                  Exoplanet Quiz
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>
                  {quizQuestions[currentQuestion].question}
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={selectedAnswer}
                    onChange={handleAnswerSelect}
                  >
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                        sx={{
                          color: answerSubmitted
                            ? option === quizQuestions[currentQuestion].correctAnswer
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
                    {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </Button>
                )}
                {answerSubmitted && (
                  <Typography sx={{ mt: 2, color: selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 'green' : 'red' }}>
                    {selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                      ? 'Correct!'
                      : `Incorrect. The correct answer is: ${quizQuestions[currentQuestion].correctAnswer}`}
                  </Typography>
                )}
              </>
            ) : showScore ? (
              <>
                <Typography variant="h5" gutterBottom sx={{ color: '#4fc3f7' }}>
                  Quiz Complete!
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                  You scored {score} out of {quizQuestions.length}
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
            ) : (
              <Typography>Loading quiz...</Typography>
            )}
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default MoreExoplanet;