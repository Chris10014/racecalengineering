import React, { Component } from 'react';
import Header from "./HeaderComponent";
import Races from "./RacesComponent";
import SportEventDetail from './SportEventDetailComponent';
import Home from './HomeComponent';
import { SPORTEVENTS } from "../shared/sportEvents";
import { COUNTRIES } from "../shared/countries";
import { SPORTS } from "../shared/sports";
import { Switch, Route, Redirect } from 'react-router-dom';

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

      const HomePage = () => {
        return(
            <Home 
            />
        );
      }

      const SportEventWIthId = ({match}) => {
        return(
          <SportEventDetail sportEvent={this.state.sportEvents.filter((sportEvent) => sportEvent.id === parseInt(match.params.sportEventId))[0]} sports={this.state.sports} />
        );
      }
        return (
          <div>      
            <Header />
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/races' component={() => <Races sportEvents={this.state.sportEvents} countries={this.state.countries} onClick={(sportEventId) => this.onSportEventSelect(sportEventId)} />} />
              <Route path='/races/:sportEventId' component={SportEventWIthId} />
              <Redirect to="/home" />
          </Switch>
            
          </div>
        );
      }

}


export default Main;