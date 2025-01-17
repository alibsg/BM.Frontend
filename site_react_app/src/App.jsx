import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import { history } from './tools'
import './App.css';
import { LoginPage } from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage'
import { PrivateRoute } from './components/privateRoute'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,     
    }
  }

  render() {
    return (
      <Router history={history}>
        <div>          
          <Switch>
              <PrivateRoute exact path='/' component={DashboardPage} />
              <Route path='/login' component={LoginPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
