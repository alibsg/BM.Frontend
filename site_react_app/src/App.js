/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import SignIn from './components/sign-in/SignIn'
import { userActions } from './actions'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,     
    }
  }

  onSubmit(username, password){
    this.setState({ loading: true});
    this.props.dispatch(userActions.login(username,password));
    console.log(username,password);
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
      <SignIn onSubmit={this.onSubmit.bind(this)} loading={this.state.loading}/>        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
}

export default connect(mapStateToProps)(App);
