import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GuessCountry from './pages/GuessCountry/GuessCountry';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GuessCountry />} />
            </Routes>
        </Router>
    );
};

export default App;
