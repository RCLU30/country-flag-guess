import React from 'react';
import PropTypes from "prop-types";
import './Choices.css';

const Choices = (props) => {
  let id = 0;
  let choices = props.choices.map( item => {
    return <li class="country-choice" key={id += 1}>
      <input 
      type="radio" 
      name="country" 
      value={item} 
      onChange={props.handleChange} 
    />
    <label>{item}</label><br />
    </li>
  });
  
  return (
    <div className="selections">
      <form className="form" onSubmit={props.handleSubmit}>
        <ul>
          {choices}
        </ul>
        <button type="submit" >Submit</button>
      </form>
    </div>
  );
};

Choices.propTypes = { 
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default Choices;
