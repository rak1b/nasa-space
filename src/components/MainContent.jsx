import React from 'react';
import './MainContent.css'; // Link to your custom CSS
import SingleExoplanet from './SingleExoplanet';

function MainContent() {
  return (
    <main className="main-content">
      {/* Welcome Section with space background */}
      {/* <section className="welcome-section" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1448375240586-882707db888b?fit=crop&w=1500&q=80)' }}>
        <div className="overlay"></div>
        <div className="container">
          <h1 className="main-heading">
            Welcome to the Fascinating World of Exoplanets! 🌟
          </h1>
          <p className="intro-text">
            Are you ready to explore worlds beyond our Solar System? 🌍✨ Our site is your gateway to discovering exoplanets—
            planets that orbit stars far away in distant galaxies.
          </p>
        </div>
      </section> */}

      {/* What is an Exoplanet Section */}
      <section className="info-section">
        <div className="container">
          <h2 className="section-heading">What is an Exoplanet?</h2>
          <hr className="section-divider" />
          <p className="section-text">
            An exoplanet is a planet that doesn’t orbit our Sun but orbits another star in a different solar system.
            There are thousands of exoplanets out there, and some might even have the conditions to support life!
          </p>
          <div   style={{
        display: 'flex',
        justifyContent: 'center'
        }}>
          <SingleExoplanet/>
          </div>
          {/* <img src="https://images.unsplash.com/photo-1519881205204-54f1f192e9f8?fit=crop&w=1500&q=80" alt="Exoplanet Example" className="section-image" /> */}
        </div>
      </section>

      {/* Why Should You Explore Section */}
      <section className="explore-section">
        <div className="container">
          <h2 className="section-heading">Why Should You Explore?</h2>
          <hr className="section-divider" />
          <p className="section-text">
            Whether you're a curious kid, a high school student, or just a space enthusiast, there's something exciting waiting for you!
            Learn about planets with multiple suns, explore gas giants bigger than Jupiter, or dive into water worlds that could be home to alien life.
          </p>
        </div>
      </section>

      {/* What You'll Discover Section */}
      <section className="discover-section">
        <div className="container">
          <h2 className="section-heading">What You'll Discover:</h2>
          <hr className="section-divider" />
          <ul className="discover-list">
            <li>Fun facts and cool images about exoplanets 🪐</li>
            <li>Interactive games and quizzes to test your space knowledge 🌠</li>
            <li>Kid-friendly explanations of how we find new planets 🔭</li>
            <li>Inspiring stories about real-life astronomers and scientists 🚀</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default MainContent;
