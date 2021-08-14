import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Main from "./components/MainComponent";

library.add(faGlobe)

class App extends Component {

  render() {
    return (
      <BrowserRouter> {/* configure App to use react router */}
        <div>
          <Main />
        </div>
      </BrowserRouter>
    );
  }  
}

export default App;
