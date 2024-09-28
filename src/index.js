import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LandingPage from './LandingPage';
import '../src/assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS for Carousel functionality
import NotFound from './components/NotFound';
import AllExoplanets from './components/AllExoplanets';
import ExoplanetVisualizer from './components/ExoplanetVisualizer';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/exoplanets" element={<ExoplanetVisualizer />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<NotFound />} /> {/* 404 Not Found route */}
      </Routes>
    </Router>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
