// src/ExoplanetEducation.js

import React from 'react';
import '../assets/css/ExoplanetEducation.css'; // Custom CSS for styling

const ExoplanetEducation = () => {
  return (
    <section id="why_exoplanet">
    <div className="exoplanet-education py-5 ">
      <div className="container">
        <div className="text-center mb-5 mt-5">
          <h2 className="section-title">Why You Should Learn About Exoplanets</h2>
          <p className="lead">Unveil the mysteries beyond our solar system</p>
        </div>

        <div className="row">
          {/* Reason 1 */}
          <div className="col-md-4 mb-4">
            <div className="card reason-card h-100">
              <div className="card-body text-center">
                <div className="emoji-icon">🌍</div>
                <h5 className="card-title">Explore New Worlds</h5>
                <p className="card-text">
                  Discover the vast diversity of planets beyond our solar system, expanding your horizons.
                </p>
              </div>
            </div>
          </div>

          {/* Reason 2 */}
          <div className="col-md-4 mb-4">
            <div className="card reason-card h-100">
              <div className="card-body text-center">
                <div className="emoji-icon">🔬</div>
                <h5 className="card-title">Advance Science</h5>
                <p className="card-text">
                  Contribute to understanding planetary formation and refining scientific theories.
                </p>
              </div>
            </div>
          </div>

          {/* Reason 3 */}
          <div className="col-md-4 mb-4">
            <div className="card reason-card h-100">
              <div className="card-body text-center">
                <div className="emoji-icon">👽</div>
                <h5 className="card-title">Search for Life</h5>
                <p className="card-text">
                  Participate in the quest to find life beyond Earth by studying habitable exoplanets.
                </p>
              </div>
            </div>
          </div>

          {/* Reason 4 */}
          <div className="col-md-4 mb-4">
            <div className="card reason-card h-100">
              <div className="card-body text-center">
                <div className="emoji-icon">🚀</div>
                <h5 className="card-title">Drive Innovation</h5>
                <p className="card-text">
                  Engage with cutting-edge technology and methodologies in space exploration.
                </p>
              </div>
            </div>
          </div>

          {/* Reason 5 */}
          <div className="col-md-4 mb-4">
            <div className="card reason-card h-100">
              <div className="card-body text-center">
                <div className="emoji-icon">🌌</div>
                <h5 className="card-title">Inspire Curiosity</h5>
                <p className="card-text">
                  Ignite imagination and ponder profound questions about our place in the universe.
                </p>
              </div>
            </div>
          </div>

          {/* Reason 6 */}
          <div className="col-md-4 mb-4">
            <div className="card reason-card h-100">
              <div className="card-body text-center">
                <div className="emoji-icon">🤝</div>
                <h5 className="card-title">Join a Global Community</h5>
                <p className="card-text">
                  Be part of an international effort, collaborating with scientists worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default ExoplanetEducation;
