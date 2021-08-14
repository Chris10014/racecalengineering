import React, { Component } from 'react';
import Header from "./HeaderComponent";
import Races from "./RacesComponent";
import Home from "./HomeComponent";
import SportEventDetail from './SportEventDetailComponent';
import { SPORTEVENTS } from "../shared/sportEvents";
import { COUNTRIES } from "../shared/countries";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(probs) {
    super(probs);
    this.state = {
      sportEvents: SPORTEVENTS,
      countries: COUNTRIES,
    };
  }

  render() {
    const HomePage = () => {
      return <Home />;
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/races" component={() => (
              <Races sportEvents={this.state.sportEvents} countries={this.state.countries} />
            )}
          />
          <Redirect to="/home" /> {/* navigates to HomePage it url doesnt exist */}
        </Switch>
      </div>
    );
  }
}

export default Main;