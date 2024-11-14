import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/guess-country" className="nav-link">Guess Country</Link>
        <Link to="/guess-capital" className="nav-link">Guess Capital</Link>
      </nav>
    </header>
  );
};

export default Header;
