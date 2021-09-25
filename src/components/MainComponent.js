import React, { Component } from 'react';
import Header from "./HeaderComponent";
import Footer from "./Footercomponent";
import EventCalendar from "./EventCalendarComponent";
import SportEventDetail from './SportEventDetailComponent';
import Home from './HomeComponent';
// import { SPORTEVENTS } from "../shared/sportEvents";
// import { COUNTRIES } from "../shared/countries";
// import { SPORTS } from "../shared/sports";
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    sportEvents: state.sportEvents,
    countries: state.countries,
    sports: state.sports
  }
}

class Main extends Component {
    constructor(probs) {
        super(probs);
        this.state = {
            // sportEvents: SPORTEVENTS,
            // countries: COUNTRIES,
            // sports: SPORTS,
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

      const SportEventWithId = ({match}) => {
        return(
          <SportEventDetail sportEvent={this.props.sportEvents.filter((sportEvent) => sportEvent.id === parseInt(match.params.sportEventId))[0]} sports={this.props.sports} />
        );
      }
        return (
          <div>      
            <Header />
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/eventcalendar' component={() => <EventCalendar sportEvents={this.props.sportEvents} countries={this.props.countries} onClick={(sportEventId) => this.onSportEventSelect(sportEventId)} />} />
              <Route path='/eventcalendar/:sportEventId' component={SportEventWithId} />
              <Redirect to="/home" />
          </Switch>
          <Footer />            
          </div>
        );
      }

}


export default connect(mapStateToProps)(Main);