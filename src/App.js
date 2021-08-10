import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/HeaderComponent";
import Races from "./components/RacesComponent";
import { SPORTEVENTS } from "./shared/sportEvents";
import { COUNTRIES } from "./shared/countries";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sportEvents: SPORTEVENTS,
      countries: COUNTRIES
    };
  }

  render() {
    return (
      <div>      
        <Header />
        <Races sportEvents={this.state.sportEvents} countries={this.state.countries} />   
      </div> /* / .App */
    );
  }
  
}

export default App;
