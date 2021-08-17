import React, { Component } from 'react';
import Header from "./HeaderComponent";
import Races from "./RacesComponent";
import SportEventDetail from './SportEventDetailComponent';
import { SPORTEVENTS } from "../shared/sportEvents";
import { COUNTRIES } from "../shared/countries";
import { SPORTS } from "../shared/sports";

class Main extends Component {
    constructor(probs) {
        super(probs);
        this.state = {
            sportEvents: SPORTEVENTS,
            countries: COUNTRIES,
            sports: SPORTS,
            selectedSportEvent: null
        };
    }

    onSportEventSelect(sportEventId) {
      this.setState({selectedSportEvent: sportEventId});
    }


    render() {
        return (
          <div>      
            <Header />
            <Races sportEvents={this.state.sportEvents} countries={this.state.countries}
              onClick={(sportEventId) => this.onSportEventSelect(sportEventId)} /> 
            <SportEventDetail sportEvent={this.state.sportEvents.filter((sportEvent) => sportEvent.id === this.state.selectedSportEvent)[0]} sports={this.state.sports} />
          </div> /* / .App */
        );
      }

}

export default Main;