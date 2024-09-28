import React, { useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const SingleExoplanet = () => {
  const orbitControlsRef = useRef();

  // WASP-17b data
  const exoplanet = {
    name: 'WASP-17b',
    radius: 1.93, // WASP-17b is roughly 1.93 times the radius of Jupiter
    distance: 1000, // in light years
    textureUrl: '/images/neptune.jpg', // Path to the gas giant texture
    description: 'WASP-17b is one of the largest known exoplanets and is a gas giant. It is about 1.93 times the radius of Jupiter.',
  };

  // Load the texture using Three.js's TextureLoader
  const texture = useLoader(THREE.TextureLoader, exoplanet.textureUrl);

  return (
    <div style={styles.container}>
      {/* Canvas for the exoplanet globe */}
      <div style={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          {/* Ambient light and stars in the background */}
          <ambientLight intensity={0.7} />
          <Stars />

          {/* Exoplanet Globe (WASP-17b) */}
          <mesh>
            <sphereGeometry args={[exoplanet.radius, 100,100]} />
            <meshStandardMaterial map={texture} />
          </mesh>

          {/* Orbit controls to allow rotating and zooming */}
          <OrbitControls ref={orbitControlsRef} />
        </Canvas>
      </div>

      {/* Information Panel */}
      <div style={styles.infoPanel}>
        <h2>{exoplanet.name}</h2>
        <p>{exoplanet.description}</p>
        <p>Distance: {exoplanet.distance} light years</p>
      </div>
    </div>
  );
};

// CSS styles using inline styles
const styles = {
  container: {
    display: 'flex',
    height: '100%',
    width: '80%',
  },
  canvasContainer: {
    flex: 1, // Takes up 50% of the page width
    background: 'black', // Canvas container background
  },
  infoPanel: {
    flex: 1, // Takes up 50% of the page width
    padding: '20px',
    color: 'white',
    background: '#1a1a1a', // Dark background for contrast
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
};

export default SingleExoplanet;
