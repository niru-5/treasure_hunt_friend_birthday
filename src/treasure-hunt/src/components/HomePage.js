import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import yaml from 'js-yaml';
import codesData from '../assets/codes.yaml';

const HomePage = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [showGame, setShowGame] = useState(false);
  const navigate = useNavigate();

  const handleCodeSubmit = async () => {
    try {
      const response = await fetch(codesData);
      const yamlText = await response.text();
      const codes = yaml.load(yamlText);
      console.log("Parsed codes:", codes);

      const validCode = codes.find(c => c.code === code);

      if (validCode) {
        navigate(`/game/${code}`);
      } else {
        setError('Invalid code. Please try again.');
      }
    } catch (e) {
      console.error("Error loading or parsing codes:", e);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Happy Birthday Sarthak</h1>
      <div style={styles.bicycle}>🚲</div>
      
      {!showGame ? (
        <div style={styles.questionContainer}>
          <h2 style={styles.question}>Ready for a Wheely Fun Treasure Hunt?</h2>
          <p style={styles.subtext}>Gear up for a cycling adventure!</p>
          <button style={styles.button} onClick={() => setShowGame(true)}>Let's Ride!</button>
        </div>
      ) : (
        <div style={styles.gameContainer}>
          <h2 style={styles.subtitle}>Pedal Your Way to Treasure</h2>
          <input
            type="text"
            placeholder="Enter the secret bike code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button} onClick={handleCodeSubmit}>Start the Race</button>
          {error && <p style={styles.error}>{error}</p>}
        </div>
      )}
      <div style={styles.cycleTrack}>🚴‍♂️💨 . . . . . . . . . . . . . . . . . . . . 🏁</div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    backgroundImage: 'linear-gradient(#87CEEB, #E0F6FF)',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '1rem',
  },
  bicycle: {
    fontSize: '4rem',
    marginBottom: '2rem',
  },
  subtitle: {
    fontSize: '1.8rem',
    color: '#444',
    marginBottom: '1rem',
  },
  questionContainer: {
    textAlign: 'center',
  },
  question: {
    fontSize: '1.5rem',
    color: '#555',
    marginBottom: '0.5rem',
  },
  subtext: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '1rem',
  },
  gameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    marginBottom: '1rem',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
  },
  cycleTrack: {
    fontSize: '1.5rem',
    marginTop: '2rem',
    letterSpacing: '2px',
  },
};

export default HomePage;
