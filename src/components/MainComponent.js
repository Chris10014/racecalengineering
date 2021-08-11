import React, { Component } from 'react';
import Header from "./HeaderComponent";
import Races from "./RacesComponent";
import SportEventDetail from './SportEventDetailComponent';
import { SPORTEVENTS } from "../shared/sportEvents";
import { COUNTRIES } from "../shared/countries";

class Main extends Component {
    constructor(probs) {
        super(probs);
        this.state = {
            sportEvents: SPORTEVENTS,
            countries: COUNTRIES,
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

export default Main;