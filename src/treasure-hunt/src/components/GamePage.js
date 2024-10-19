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
          setCurrentQuestionIndex(matchingCode.current_question); // Subtract 1 because array is 0-indexed
        } else {
          console.error("Code not found or current_question is null");
        }
      } catch (error) {
        console.error("Error loading or parsing data:", error);
      }
    };
    loadQuestionsAndCode();
  }, [code]);

  console.log("Current questions state:", questions);

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
    setCurrentQuestionIndex(newIndex);
    updateProgress(newIndex);
  };

  return (
    <div>
      {questions.length > 0 ? (
        <QuestionComponent 
          question={questions[currentQuestionIndex]}
          onNext={handleNextQuestion}
        />
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default GamePage;
