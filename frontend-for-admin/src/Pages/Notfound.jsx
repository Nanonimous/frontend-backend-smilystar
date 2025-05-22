import React from 'react';

const Notfound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.text}>Oops! Page not found.</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '100px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '100px',
    color: '#ff4c4c',
    margin: 0,
  },
  text: {
    fontSize: '24px',
    color: '#333',
  },
};

export default Notfound;
