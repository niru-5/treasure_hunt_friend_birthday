import React, { useState, useEffect } from 'react';

const QuestionComponent = ({ question, onNext }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [clue, setClue] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    console.log("Current question:", question);
    console.log("Image path:", question.image);
  }, [question]);

  const handleAnswerSubmit = () => {
    if (answer.toLowerCase() === question.answer.toLowerCase()) {
      onNext(); // Move to the next question
    } else {
      setClue(question.clue);
      setError('Wrong turn! Try again!');
    }
  };

  const handleImageError = () => {
    console.error("Failed to load image:", question.image);
    setImageError(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.question}>{question.text}</h2>
      {question.image && (
        <div style={styles.imageContainer}>
          <img 
            src={`/images/${question.image}`} 
            alt="clue" 
            onError={handleImageError}
            style={styles.image}
          />
          {imageError && <p style={styles.imageError}>Failed to load image. Path: {question.image}</p>}
        </div>
      )}
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your answer"
        style={styles.input}
      />
      <button onClick={handleAnswerSubmit} style={styles.button}>Pedal On!</button>
      {error && <p style={styles.error}>{error}</p>}
      {clue && <p style={styles.clue}>Bike Hint: {clue}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  question: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: '1rem',
    width: '100%',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  imageError: {
    color: 'red',
    fontSize: '0.9rem',
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
  clue: {
    color: '#666',
    marginTop: '1rem',
    fontStyle: 'italic',
  },
};

export default QuestionComponent;
