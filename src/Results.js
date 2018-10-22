import React from 'react';
import PropTypes from "prop-types";

const Results = ({answer, selection, newGame}) => {
  let text = '';
  if (answer === selection){
    text = <p>You got it right. It is <strong>{answer}</strong>.</p>;
  }
  else {
    text = <p>You got it wrong. It is not {selection}. It is <strong>{answer}</strong>.</p>;
  }

  return(
    <div class="selections">
      {text}
      <button onClick={newGame} type="submit">New Game?</button>
    </div>
  );
};

Results.propTypes = { 
  answer: PropTypes.string.isRequired,
  selection: PropTypes.string.isRequired,
  newGame: PropTypes.func.isRequired
};
export default Results;

