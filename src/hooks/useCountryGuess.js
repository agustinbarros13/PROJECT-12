import { useState, useCallback } from 'react';

const useCountryGuess = (dispatch) => {
    const [currentCountry, setCurrentCountry] = useState(null);
    const [countryOptions, setCountryOptions] = useState([]);

    const fetchRandomCountry = useCallback(async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();

            const randomIndex = Math.floor(Math.random() * data.length);
            const randomCountry = data[randomIndex];
            setCurrentCountry(randomCountry);
            generateOptions(randomCountry.name.common, data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }, []); 

    const generateOptions = (correctCountryName, allCountries) => {
        const options = [correctCountryName, ...getOtherCountries(correctCountryName, allCountries)];
        setCountryOptions(shuffleArray(options));
    };

    const getOtherCountries = (correctCountry, allCountries) => {
        //países aleatorios
        const filteredCountries = allCountries.filter(country => country.name.common !== correctCountry);
        const randomOptions = [];
        while (randomOptions.length < 3) {
            const randomIndex = Math.floor(Math.random() * filteredCountries.length);
            const selectedCountry = filteredCountries.splice(randomIndex, 1)[0].name.common;
            if (!randomOptions.includes(selectedCountry)) {
                randomOptions.push(selectedCountry);
            }
        }
        return randomOptions;
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    return { currentCountry, fetchRandomCountry, countryOptions };
};

export default useCountryGuess;
