import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import GuessCountry from './pages/GuessCountry/GuessCountry';
import GuessCapital from './pages/GuessCapital/GuessCapital';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/guess-country" element={<GuessCountry />} />
                <Route path="/guess-capital" element={<GuessCapital />} />
            </Routes>
        </Router>
    );
};

export default App;
