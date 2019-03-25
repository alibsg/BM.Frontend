/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import SignIn from './components/sign-in/SignIn'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {     
    }
  }
  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          margin: 'auto',
          backgroundColor: 'transparent'
        }}
      > 
      <SignIn />        
      </div>
    );
  }
}

export default App;
