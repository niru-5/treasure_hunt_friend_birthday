import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import yaml from 'js-yaml';
import codesData from '../assets/codes.yaml'; // Import the YAML file

const HomePage = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
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
    <div>
      <h1>Welcome to Treasure Hunt</h1>
      <input
        type="text"
        placeholder="Enter your code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleCodeSubmit}>Start Game</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default HomePage;
