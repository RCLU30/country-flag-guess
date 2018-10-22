import React, { Component } from 'react';
import "./App.css";
import "./CountryGame.css";
import Flag from "./Flag";
import Choices from "./Choices";
import Results from "./Results";
import shuffle from "shuffle-array";

const gameState= {
  LOADING: 0,
  SUBMITTED: 1,
  NEWGAME: 2
};

class CountryGame extends Component {
  constructor(props){
    super(props);
    this.state = {
      countryMap: [],
      choices: [],
      answer: '',
      flag: '',
      selection: '',
      gameState: gameState.LOADING
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.newGame = this.newGame.bind(this);
    this.randomizeChoices = this.randomizeChoices.bind(this);
  }
  
  componentDidMount(){
    const baseUrl = "https://restcountries.eu/rest/v2/all";
    window.fetch(baseUrl)
      .then(data => data.json())
      .then(countriesJSON => {
        let countryMap = countriesJSON.map(country => ({
          name: country.name,
          flag: country.flag,
          id: Number(country.numericCode)
        }));
        this.setState({
          countryMap
        });
        this.randomizeChoices();
      })
      .catch(console.log(`Warning: ${console.warn}`));
  }
  
  randomizeChoices(){
    let {countryMap} = this.state;
    let choiceA = countryMap[Math.floor(Math.random() * countryMap.length)].name;
    let choiceB = countryMap[Math.floor(Math.random() * countryMap.length)].name;
    let choiceC = countryMap[Math.floor(Math.random() * countryMap.length)].name;
    let answerIndex = Math.floor(Math.random() * countryMap.length);
    let answer = countryMap[answerIndex].name;
    let flag = countryMap[answerIndex].flag;
    
    while (choiceA === choiceB){
      choiceB = countryMap[Math.floor(Math.random() * countryMap.length)].name;
    }
    while (choiceB === choiceC && choiceA === choiceC){
      choiceC = countryMap[Math.floor(Math.random() * countryMap.length)].name;
    }
    
    let choices = [];
    choices.push(choiceA, choiceB, choiceC, answer);
    shuffle(choices);
    
    this.setState({
      answer,
      flag,
      choices
    });
  }
  
  handleSubmit(e){
    e.preventDefault();
    this.setState({
      gameState: gameState.SUBMITTED
    });
  }
  
  handleChange(event) {
    this.setState({selection: event.target.value});
  }
  
  newGame(e){
    e.preventDefault();
    this.randomizeChoices();
    this.setState({
      gameState: gameState.LOADING
    });
  }

  render() {
    let views = <div style={{textAlign:"center"}}> Loading...</div>;
    let flagView = <div></div>
    const {answer, flag, choices, selection} = this.state;
    
    if (flag){
      flagView = <Flag flagSvg={flag} />
    }
    
    if (this.state.gameState === gameState.LOADING && answer){
      views = 
        <Choices 
          answer={answer}
          choices={choices}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />;
    }
    if (this.state.gameState === gameState.SUBMITTED){
      views = 
        <Results answer={answer} selection={selection} newGame={this.newGame} />
    }

    return (
      <div >
        <div id="banner">
          <h1 class="title-text">Guess the flag</h1>
          <p><strong>How to play: </strong>Click on a country matching the image of the flag below. To play again click the "New Game?" button.</p>
        </div>
        {views}
        {flagView}
      </div>
    );
  }
}

export default CountryGame;
