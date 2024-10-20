import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import yaml from 'js-yaml';
import QuestionComponent from './QuestionComponent';
import questionsData from '../assets/questions.yaml';
import codesData from '../assets/codes.yaml';

const GamePage = () => {
  const { code } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  
  useEffect(() => {
    const loadQuestionsAndCode = async () => {
      try {
        // Load questions
        const questionsResponse = await fetch(questionsData);
        const questionsYaml = await questionsResponse.text();
        const parsedQuestions = yaml.load(questionsYaml);
        
        if (parsedQuestions && Array.isArray(parsedQuestions.questions)) {
          setQuestions(parsedQuestions.questions);
        } else {
          console.error("Invalid questions data structure");
          setQuestions([]);
        }

        // Load codes
        const codesResponse = await fetch(codesData);
        const codesYaml = await codesResponse.text();
        const parsedCodes = yaml.load(codesYaml);

        // Find the matching code and set the current question index
        const matchingCode = parsedCodes.find(item => item.code === code);
        if (matchingCode && matchingCode.current_question !== null) {
          if (parsedQuestions.questions.length > matchingCode.current_question) {
            setCurrentQuestionIndex(matchingCode.current_question); // Subtract 1 because array is 0-indexed
          } else {
            setIsGameFinished(true);
          }
        } else {
          console.error("Code not found or current_question is null");
        }
      } catch (error) {
        console.error("Error loading or parsing data:", error);
      }
    };
    loadQuestionsAndCode();
  }, [code]);

  // console.log("Current questions state:", questions);

  const updateProgress = async (newIndex) => {
    try {
      const response = await fetch('/api/update-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          currentQuestion: newIndex
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update progress');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleNextQuestion = () => {
    const newIndex = currentQuestionIndex + 1;
    if (newIndex < questions.length) {
      setCurrentQuestionIndex(newIndex);
      updateProgress(newIndex);
    } else {
      updateProgress(newIndex);
      setIsGameFinished(true);
    }
  };

  const renderContent = () => {
    if (questions.length === 0) {
      return <p style={styles.loading}>Preparing your route...</p>;
    }

    if (isGameFinished) {
      return (
        <div style={styles.endContainer}>
          <h2 style={styles.endTitle}>Congratulations!</h2>
          <p style={styles.endMessage}>You've completed the Cycle Quest!</p>
          <div style={styles.endEmoji}>🎉🚴‍♂️🏆</div>
        </div>
      );
    }

    return (
      <div style={styles.questionContainer}>
        <QuestionComponent 
          question={questions[currentQuestionIndex]}
          onNext={handleNextQuestion}
        />
        <p style={styles.progress}>
          Checkpoint {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cycle Quest</h1>
      <div style={styles.bicycle}>🚴‍♂️</div>
      {renderContent()}
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
  questionContainer: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
  },
  loading: {
    fontSize: '1.2rem',
    color: '#666',
  },
  progress: {
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#666',
    textAlign: 'center',
  },
  cycleTrack: {
    fontSize: '1.5rem',
    marginTop: '2rem',
    letterSpacing: '2px',
  },
  endContainer: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
  },
  endTitle: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  endMessage: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '1rem',
  },
  endEmoji: {
    fontSize: '3rem',
    marginTop: '1rem',
  },
};

export default GamePage;
