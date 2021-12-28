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
  fetchEventDates,
  loginUser,
  logoutUser,
} from "../redux/ActionCreators";
import CreateSportEvent from './CreateSportEventComponent';

const mapStateToProps = state => {
  return {
    sportEvents: state.sportEvents,
    countries: state.countries,
    sports: state.sports,
    eventDates: state.eventDates,
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
  fetchEventDates: () => {
    dispatch(fetchEventDates());
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
      this.props.fetchEventDates();
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

      const EventDateWithId = ({ match }) => {
        return (
          <SportEventDetail
            eventDate={
              this.props.eventDates.eventDates.filter(
                (eventDate) => eventDate._id === match.params.eventDateId
              )[0]
            }
            sports={this.props.sports}
            isLoading={this.props.eventDates.isLoading}
            errMess={this.props.eventDates.errMess}
          />
        );
      };
        return (
          <div>      
            <Header />
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/eventcalendar' component={() => <EventCalendar eventDates={this.props.eventDates} sportEvents={this.props.sportEvents} sports={this.props.sports} countries={this.props.countries} onClick={(sportEventId) => this.onSportEventSelect(sportEventId)} />} />
              <Route path='/eventcalendar/:eventDateId' component={EventDateWithId} />
              <Route path='/createsportevent' component={() => <CreateSportEvent sportEvents={this.props.sportEvents} />} />
              <Redirect to="/home" />
          </Switch>
          <Footer />            
          </div>
        );
      }

}


export default connect(mapStateToProps, mapDispatchToProps)(Main);