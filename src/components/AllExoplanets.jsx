import React from 'react';
import { Link } from 'react-router-dom';

const AllExoplanets = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>All_Exoplanets</h1>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default AllExoplanets;
