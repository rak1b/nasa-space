import React, { useState, useEffect } from 'react';

const ExoplanetExplorer = () => {
  const [gameState, setGameState] = useState('setup');
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [solarSystem, setSolarSystem] = useState([]);
  const [exoplanets, setExoplanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [turnCount, setTurnCount] = useState(0);
  const MAX_TURNS = 10;

  useEffect(() => {
    // Initialize solar system planets
    setSolarSystem([
      { name: 'Mars', resources: ['water', 'minerals', 'gases'], image: 'mars.jpg' },
      { name: 'Venus', resources: ['metals', 'gases', 'energy'], image: 'venus.jpg' },
      { name: 'Jupiter', resources: ['gases', 'energy', 'exotic particles'], image: 'jupiter.jpg' },
    ]);

    // Initialize exoplanets
    setExoplanets([
      { name: 'Kepler-16b', resources: ['water', 'minerals', 'gases'], image: 'kepler16b.jpg' },
      { name: 'Gliese 581g', resources: ['ice', 'metals', 'crystals'], image: 'gliese581g.jpg' },
      { name: 'HD 209458 b', resources: ['plasma', 'exotic particles', 'energy'], image: 'hd209458b.jpg' },
    ]);
  }, []);

  const startGame = () => {
    const newPlayers = [
      { id: 0, name: 'Solar System Team', score: 0, resources: {} },
      { id: 1, name: 'Exoplanet Team', score: 0, resources: {} },
    ];
    setPlayers(newPlayers);
    setGameState('playing');
    setTurnCount(0);
  };

  const selectPlanet = (planet) => {
    setSelectedPlanet(planet);
  };

  const collectResource = (resource) => {
    const updatedPlayers = [...players];
    const currentPlayerData = updatedPlayers[currentPlayer];
    
    currentPlayerData.resources[resource] = (currentPlayerData.resources[resource] || 0) + 1;
    currentPlayerData.score += 10;
    
    setPlayers(updatedPlayers);
    setSelectedPlanet(null);
    
    if (players.length > 1) {
      setCurrentPlayer((currentPlayer + 1) % players.length);
    }
    
    setTurnCount(turnCount + 1);
    if (turnCount + 1 >= MAX_TURNS * players.length) {
      setGameState('gameover');
    }
  };

  const renderSetup = () => (
    <div className="game-setup">
      <h1>Exoplanet Race: Solar System vs. Exoplanet</h1>
      <p>Explore and collect resources from both our Solar System and distant exoplanets!</p>
      <button onClick={startGame}>Start Game</button>
    </div>
  );

  const renderGameBoard = () => (
    <div className="game-board">
      <h1>Exoplanet Race: Solar System vs. Exoplanet</h1>
      <div className="player-info">
        <h2>Current Team: {players[currentPlayer].name}</h2>
        <p>Score: {players[currentPlayer].score}</p>
        <p>Turn: {Math.floor(turnCount / players.length) + 1} / {MAX_TURNS}</p>
      </div>
      <div className="planet-systems">
        <div className="solar-system">
          <h2>Solar System</h2>
          {solarSystem.map((planet, index) => (
            <div key={index} className="planet" onClick={() => selectPlanet(planet)}>
              <img src={planet.image} alt={planet.name} />
              <h3>{planet.name}</h3>
            </div>
          ))}
        </div>
        <div className="exoplanets">
          <h2>Exoplanets</h2>
          {exoplanets.map((planet, index) => (
            <div key={index} className="planet" onClick={() => selectPlanet(planet)}>
              <img src={planet.image} alt={planet.name} />
              <h3>{planet.name}</h3>
            </div>
          ))}
        </div>
      </div>
      {selectedPlanet && (
        <div className="planet-detail">
          <h3>{selectedPlanet.name}</h3>
          <div className="resources">
            {selectedPlanet.resources.map((resource, rIndex) => (
              <button key={rIndex} onClick={() => collectResource(resource)}>
                Collect {resource}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderGameOver = () => (
    <div className="game-over">
      <h1>Game Over</h1>
      <h2>Final Scores:</h2>
      {players.map((player, index) => (
        <div key={index} className="player-score">
          <h3>{player.name}: {player.score}</h3>
          <ul>
            {Object.entries(player.resources).map(([resource, amount]) => (
              <li key={resource}>{resource}: {amount}</li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={() => setGameState('setup')}>Play Again</button>
    </div>
  );

  switch (gameState) {
    case 'setup':
      return renderSetup();
    case 'playing':
      return renderGameBoard();
    case 'gameover':
      return renderGameOver();
    default:
      return null;
  }
};

export default ExoplanetExplorer;