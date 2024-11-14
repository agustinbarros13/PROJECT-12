export const initialState = {
  score: 0,
  correct: false,
  incorrect: false,
};

export const guessCountryReducer = (state, action) => {
  switch (action.type) {
      case 'GUESS_COUNTRY':
          return { ...state, correct: true, incorrect: false };
      case 'INCREMENT_SCORE':
          return { ...state, score: state.score + 1 };
      case 'RESET_SCORE':
          return { ...state, score: 0, correct: false, incorrect: false }; // Reiniciar también el estado de correct e incorrect
      default:
          return state;
  }
};
