import React from 'react';

const CountryOption = ({ country, onSelect }) => {
    return (
        <div className="country-option" onClick={() => onSelect(country)}>
            <p>{country}</p>
        </div>
    );
};

export default CountryOption;
