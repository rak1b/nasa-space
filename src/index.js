import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LandingPage from './LandingPage';
import '../src/assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS for Carousel functionality
import NotFound from './components/NotFound';
import AllExoplanets from './components/AllExoplanets';
import ExoplanetVisualizer from './components/ExoplanetVisualizer';
import ExoplanetExplorer from './components/ExoplanetExplorer';
import ExoplanetArchitect from './components/ExoplanetArchitect'; // Import Exoplanet Architect
import { DndProvider } from 'react-dnd';  // Import DndProvider
import { HTML5Backend } from 'react-dnd-html5-backend'; // Import the HTML5 backend for drag and drop
import MainAppPage from './components/MainAppPage';
import BasicExoplanet from './components/BasicExoplanet';
import More from '@mui/icons-material/More';
import MoreExoplanet from './components/MoreExoplanet';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<MainAppPage />} />
          <Route path="/basic-exoplanet" element={<BasicExoplanet />} />
          <Route path="/more-exoplanet" element={<MoreExoplanet />} />
          <Route path="/exoplanet-explorer" element={<ExoplanetVisualizer />} />
          <Route path="/exoplanet-architect" element={<ExoplanetArchitect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </DndProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
