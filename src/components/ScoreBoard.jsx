// src/components/Scoreboard.jsx
import React from 'react';

const Scoreboard = ({ score, attempts }) => {
    return (
        <div className="scoreboard">
            <p>Puntaje: {score}</p>
            <p>Intentos restantes: {attempts}</p>
        </div>
    );
};

export default Scoreboard;
