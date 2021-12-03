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
import {
  fetchSportEvents,
  fetchSports,
  loginUser,
  logoutUser,
} from "../redux/ActionCreators";
import CreateSportEvent from './CreateSportEventComponent';

const mapStateToProps = state => {
  return {
    sportEvents: state.sportEvents,
    countries: state.countries,
    sports: state.sports,
    auth: state.auth,
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchSportEvents: () => {
    dispatch(fetchSportEvents());
  },
  fetchSports: () => {
    dispatch(fetchSports());
  },
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
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
      this.props.fetchSports();
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
          <SportEventDetail sportEvent={this.props.sportEvents.sportEvents.filter((sportEvent) => sportEvent._id === (match.params.sportEventId))[0]} sports={this.props.sports} 
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
              <Route exact path='/eventcalendar' component={() => <EventCalendar sportEvents={this.props.sportEvents} sports={this.props.sports} countries={this.props.countries} onClick={(sportEventId) => this.onSportEventSelect(sportEventId)} />} />
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