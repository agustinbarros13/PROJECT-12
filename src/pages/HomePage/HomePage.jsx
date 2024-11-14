import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <Header />
            <h2>Bienvenido al Juego de Adivinanza</h2>
            <p>Selecciona un juego para comenzar:</p>
            <nav>
                <Link to="/guess-country" className="game-link">Juego de Banderas</Link>
                <Link to="/guess-capital" className="game-link">Juego de Capitales</Link>
            </nav>
            <Footer />
        </div>
    );
};

export default HomePage;
