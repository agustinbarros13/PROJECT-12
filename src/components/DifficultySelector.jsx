// src/components/DifficultySelector.jsx
import React from 'react';

const DifficultySelector = ({ onChangeDifficulty }) => {
    return (
        <div className="difficulty-selector">
            <button onClick={() => onChangeDifficulty('easy')}>Fácil</button>
            <button onClick={() => onChangeDifficulty('hard')}>Difícil</button>
        </div>
    );
};

export default DifficultySelector;
