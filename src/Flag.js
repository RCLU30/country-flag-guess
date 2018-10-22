import React from 'react';
import PropTypes from "prop-types";
import "./Flag.css";

const Flag = props => {
  let flagSvg = props.flagSvg;
  return (
    <div id="flag-area">
      <img class="image" alt="flag" width="400px" type="image/svg+xml" src={flagSvg}>
      </img>
    </div>
  );
};

Flag.propTypes = { 
  flagSvg: PropTypes.string.isRequired,
};

export default Flag;
