import React, { Component } from 'react';
import logo from './logo.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Main from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";

library.add(faGlobe)

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div>     
        <Main />
      </div>
      </BrowserRouter>
      
    );
  }  
}

export default App;
