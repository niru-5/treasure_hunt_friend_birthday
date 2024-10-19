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
      setError('Incorrect answer. Try again!');
    }
  };

  const handleImageError = () => {
    console.error("Failed to load image:", question.image);
    setImageError(true);
  };

  return (
    <div>
      <h2>{question.text}</h2>
      {question.image && (
        <>
          <img 
            src={`/images/${question.image}`} 
            alt="clue" 
            onError={handleImageError}
            style={{maxWidth: '100%', height: 'auto'}}
          />
          {imageError && <p>Failed to load image. Path: {question.image}</p>}
        </>
      )}
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your answer"
      />
      <button onClick={handleAnswerSubmit}>Submit</button>
      {error && <p>{error}</p>}
      {clue && <p>Clue: {clue}</p>}
    </div>
  );
};

export default QuestionComponent;
