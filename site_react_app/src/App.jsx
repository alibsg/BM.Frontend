/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Router, Route} from 'react-router-dom'
import { history } from './tools'
import './App.css';
import { LoginPage } from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage'
import { PrivateRoute } from './components/privateRoute'

class App extends Component {
  constructor(props) {
    super(props);
    //localStorage.removeItem('user');
    this.state = {
      loading: false,     
    }
  }

 
  render() {
    return (
      <div className="ag-theme-balham"> 
        <LoginPage/>
        <Router history={history}>
          <div>
            <PrivateRoute exact path='/' component={ DashboardPage } />
            <Route exact path='/login' Component={ LoginPage } />
          </div>        
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {  
  return {    
  };
}

export default connect(mapStateToProps)(App);
