import React, { Component } from 'react';

// redux related imports
import { Provider } from "react-redux";
import { ConfigureStore } from './redux/configureStore';
// / .redux

// fontawesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFlag, faSearch, faGlobe, faRunning, faSwimmer, faBiking, faHiking, faCircle, faQuestion, faWalking, faStopwatch, faMedal, faCalendarAlt, faFrown, faSadTear } from '@fortawesome/free-solid-svg-icons';
// / .fontawesome

import './App.css';
import Main from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";

const store = ConfigureStore();

// fontawesome icons
library.add(faFlag, faSearch, faGlobe, faRunning, faSwimmer, faBiking, faHiking, faCircle, faQuestion, faWalking, faStopwatch, faMedal, faCalendarAlt, faFrown, faSadTear);

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }  
}

export default App;
