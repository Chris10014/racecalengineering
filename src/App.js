import React, { Component } from 'react';
import logo from './logo.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Header from "./components/HeaderComponent";
import Main from "./components/MainComponent";

library.add(faGlobe)

class App extends Component {

  render() {
    return (
      <div>      
        <Main />
      </div> /* / .App */
    );
  }  
}

export default App;
