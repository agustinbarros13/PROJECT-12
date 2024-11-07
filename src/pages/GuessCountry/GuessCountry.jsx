import React, { useReducer, useEffect, useState } from 'react';
import { guessCountryReducer, initialState } from '../../reducers/guessCountryReducer';
import useCountryGuess from '../../hooks/useCountryGuess';
import CountryOption from '../../components/CountryOption';
import Scoreboard from '../../components/ScoreBoard';
import DifficultySelector from '../../components/DifficultySelector';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './GuessCountry.css';

const GuessCountry = () => {
    const [state, dispatch] = useReducer(guessCountryReducer, initialState);
    const { currentCountry, fetchRandomCountry, countryOptions } = useCountryGuess(dispatch);
    const [difficulty, setDifficulty] = useState('easy');
    const [attempts, setAttempts] = useState(3);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const WINNING_SCORE = 5;  // Puntos para ganar

    useEffect(() => {
        const loadCountry = async () => {
            await fetchRandomCountry();
            setIsLoading(false);
        };
        loadCountry();
    }, []);

    const handleGuess = (selectedCountry) => {
        if (selectedCountry === currentCountry.name.common) {
            dispatch({ type: 'GUESS_COUNTRY', payload: selectedCountry });
            dispatch({ type: 'INCREMENT_SCORE' });
            fetchRandomCountry();
            setAttempts(3);
            setIsGameOver(false);

            if (state.score + 1 >= WINNING_SCORE) {
                setIsWinner(true);
            }
        } else {
            setAttempts(prevAttempts => {
                const newAttempts = prevAttempts - 1;
                if (newAttempts <= 0) {
                    setIsGameOver(true);
                }
                return newAttempts;
            });
        }
    };

    const resetGame = () => {
        setAttempts(3);
        dispatch({ type: 'RESET_SCORE' });
        fetchRandomCountry();
        setIsGameOver(false);
        setIsWinner(false);
    };

    const handleChangeDifficulty = (level) => {
        setDifficulty(level);
        resetGame();
    };

    return (
        <div className="guess-country">
            <Header />
            <h2>¿De qué bandera es este país?</h2>
            {currentCountry && (
                <div className="country-flag">
                    <img src={currentCountry.flags.svg} alt={`Flag of ${currentCountry.name.common}`} />
                </div>
            )}
            <Scoreboard score={state.score} attempts={attempts} />
            <DifficultySelector onChangeDifficulty={handleChangeDifficulty} />
            <div className="country-options">
                {isLoading ? (
                    <p>Cargando...</p>
                ) : (
                    countryOptions && countryOptions.length > 0 ? (
                        countryOptions.map((country, index) => (
                            <CountryOption key={index} country={country} onSelect={handleGuess} />
                        ))
                    ) : (
                        <p>No hay opciones disponibles.</p>
                    )
                )}
            </div>

            {/*Juego Terminado */}
            {isGameOver && !isWinner && (
                <p className="message message--error">
                    ¡Perdiste! Intenta de nuevo.
                    <button onClick={resetGame} className="reset-button">Reiniciar</button>
                </p>
            )}
            
            {/* Victoria */}
            {isWinner && (
                <p className="message message--success">
                    ¡Ganaste! Felicidades,{WINNING_SCORE} puntos.
                    <button onClick={resetGame} className="reset-button">De Nuevo</button>
                </p>
            )}
            
            <Footer />
        </div>
    );
};

export default GuessCountry;
