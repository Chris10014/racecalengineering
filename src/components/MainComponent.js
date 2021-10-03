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
import { fetchSportEvents } from '../redux/ActionCreators';
import CreateSportEvent from './CreateSportEventComponent';

const mapStateToProps = state => {
  return {
    sportEvents: state.sportEvents,
    countries: state.countries,
    sports: state.sports
  }
}

const mapDispatchToProps = dispatch => ({

fetchSportEvents: () => { dispatch(fetchSportEvents()) }

});

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

    componentDidMount() {
      this.props.fetchSportEvents();
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
          <SportEventDetail sportEvent={this.props.sportEvents.sportEvents.filter((sportEvent) => sportEvent.id === parseInt(match.params.sportEventId))[0]} sports={this.props.sports} 
          isLoading={this.props.sportEvents.isLoading}
          errMess={this.props.sportEvents.errMess} 
          />
        );
      }
        return (
          <div>      
            <Header />
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/eventcalendar' component={() => <EventCalendar sportEvents={this.props.sportEvents} countries={this.props.countries} onClick={(sportEventId) => this.onSportEventSelect(sportEventId)} />} />
              <Route path='/eventcalendar/:sportEventId' component={SportEventWithId} />
              <Route path='/createsportevent' component={() => <CreateSportEvent sportEvents={this.props.sportEvents} />} />
              <Redirect to="/home" />
          </Switch>
          <Footer />            
          </div>
        );
      }

}


export default connect(mapStateToProps, mapDispatchToProps)(Main);