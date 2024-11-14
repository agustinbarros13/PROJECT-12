import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import './GuessCapital.css';

const GuessCapital = () => {
   const [countries, setCountries] = useState([]);
   const [randomCountry, setRandomCountry] = useState(null);
   const [options, setOptions] = useState([]);
   const [selectedAnswer, setSelectedAnswer] = useState(null);
   const [isCorrect, setIsCorrect] = useState(null);
   const [score, setScore] = useState(0);
   const [attempts, setAttempts] = useState(5);
   const [gameOverMessage, setGameOverMessage] = useState(null);

   useEffect(() => {
      async function fetchCountries() {
         try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            setCountries(response.data);
            generateQuestion(response.data);
         } catch (error) {
            console.error("Error fetching countries data:", error);
         }
      }
      fetchCountries();
   }, []);

   const generateQuestion = (countryList) => {
      const selectedCountry = countryList[Math.floor(Math.random() * countryList.length)];
      setRandomCountry(selectedCountry);

      const optionsArray = [selectedCountry.capital?.[0]];

      while (optionsArray.length < 4) {
         const randomOption = countryList[Math.floor(Math.random() * countryList.length)].capital?.[0];
         if (randomOption && !optionsArray.includes(randomOption)) {
            optionsArray.push(randomOption);
         }
      }
      setOptions(shuffleArray(optionsArray));
      setSelectedAnswer(null);
      setIsCorrect(null);
   };

   const shuffleArray = (array) => {
      return array.sort(() => Math.random() - 0.5);
   };

   const handleAnswerClick = (answer) => {
      const correctAnswer = answer === randomCountry.capital?.[0];
      setSelectedAnswer(answer);
      setIsCorrect(correctAnswer);
      if (correctAnswer) setScore(score + 1);
      setAttempts(attempts - 1);

      if (attempts - 1 <= 0) {
         setTimeout(() => {
            setGameOverMessage(score >= 3 ? '🎉 ¡Ganaste! 🎉' : '😞 Inténtalo de nuevo 😞');
            resetGame();
         }, 1000);
      } else {
         setTimeout(() => generateQuestion(countries), 1000);
      }
   };

   const resetGame = () => {
      setTimeout(() => {
         setScore(0);
         setAttempts(5);
         setGameOverMessage(null);
         generateQuestion(countries);
      }, 2000);
   };

   return (
      <div className="guess-capital">
         <Header /> 
         <h2>Guess the Capital</h2>
         <p>Puntaje: {score} | Intentos restantes: {attempts}</p>
         {randomCountry && (
            <div className="country-card">
               <img src={randomCountry.flags.svg} alt={`Flag of ${randomCountry.name.common}`} className="country-flag" />
               <h3>{randomCountry.name.common}</h3>
            </div>
         )}
         <div className="capital-options">
            {options.map((option, index) => (
               <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  className={`capital-option ${selectedAnswer === option ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
               >
                  {option}
               </button>
            ))}
         </div>
         {selectedAnswer && (
            <div className={`message ${isCorrect ? 'message--success' : 'message--error'}`}>
               {isCorrect ? 'Correct!' : `Incorrect! The capital is ${randomCountry.capital?.[0]}.`}
            </div>
         )}
         {gameOverMessage && (
            <div className="game-over-message">
               {gameOverMessage}
            </div>
         )}
      </div>
   );
};

export default GuessCapital;
