import React, { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';

const MultipleGlobes = () => {
  const [exoplanets, setExoplanets] = useState([]);
  const globeRefs = useRef([]);

  useEffect(() => {
    const fetchExoplanets = async () => {
      try {
        // Fetching data from the corrected API URL
    
        const data = [
          {"pl_name": "Kepler-276 c",
            "sy_dist": 1144.8600000},
            {"pl_name": "Kepler-829 b",
            "sy_dist": 1073.7600000},
            {"pl_name": "Kepler-477 b",
            "sy_dist": 367.0000000},
            {"pl_name": "TOI-1260 c",
            "sy_dist": 73.5977000},
            {"pl_name": "HD 149143 b",
            "sy_dist": 73.2801000},
            {"pl_name": "HD 99492 b",
            "sy_dist": 18.2038000},
            {"pl_name": "nu Oph c",
            "sy_dist": 46.2107000},
            {"pl_name": "75 Cet b",
            "sy_dist": 82.9613000},
            {"pl_name": "gam Lib b",
            "sy_dist": 47.4017000},
            {"pl_name": "HD 113337 c",
            "sy_dist": 36.1800000},
            {"pl_name": "HD 28109 c",
            "sy_dist": 139.6110000},
            {"pl_name": "TOI-4562 b",
            "sy_dist": 339.6050000},
            {"pl_name": "HIP 12961 b",
            "sy_dist": 23.3710000},
            {"pl_name": "HD 11755 b",
            "sy_dist": 235.0450000},
          
        ]
        console.log("Fetched Data:", data); // Log data to ensure it's fetched

        if (data.length>0) {
          // Filter out planets with null distance or assign a default value for those
          const planets = data
            .filter((planet) => planet.sy_dist !== null) // Filter out null distances
            .map((planet, index) => ({
              name: planet.pl_name,
              distance: planet.sy_dist || 1, // Use 1 light year as a default distance if null
              coordinates: {
                lat: Math.random() * 180 - 90, // Replace with accurate coordinates if available
                lng: Math.random() * 360 - 180,
              },
              color: 'yellow',
              id: index,
            }));

          setExoplanets(planets);
        } else {
          console.error("No data returned from API.");
        }
      } catch (error) {
        console.error("Error fetching exoplanets:", error);
      }
    };

    fetchExoplanets();
  }, []);

  const handleClick = (planet) => {
    // Focus on the globe that was clicked
    const globeRef = globeRefs.current[planet.id];
    if (globeRef) {
      globeRef.pointOfView(
        { lat: planet.coordinates.lat, lng: planet.coordinates.lng, altitude: 0.5 },
        1500
      );
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      {exoplanets.length > 0 ? (
        exoplanets.map((planet, index) => (
          <>
          {/* <div key={index} style={{ width: '30vw', height: '30vh', margin: '10px' }}> */}
            <Globe
              ref={(el) => (globeRefs.current[index] = el)}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
              pointsData={[planet]}
              pointAltitude={() => 0.01} // Just a little altitude for a single point
              pointColor={() => planet.color}
              pointLat={() => planet.coordinates.lat}
              pointLng={() => planet.coordinates.lng}
              pointLabel={() => `${planet.name}: ${planet.distance} light years from Earth`}
              pointRadius={0.5}
              onPointClick={() => handleClick(planet)}
            />
            <div style={{ textAlign: 'center', marginTop: '10px', color: 'white' }}>
              <h3>{planet.name}</h3>
            </div>
          </>
        ))
      ) : (
        <p style={{ color: 'white' }}>Loading or no exoplanets to show</p>
      )}
    </div>
  );
};

export default MultipleGlobes;
