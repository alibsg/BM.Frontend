/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import SignIn from '../sign-in/SignIn.jsx'
import { userActions } from '../../actions'

class LoginPage extends Component {
  constructor(props) {
    super(props); 
    // reset login status
    this.props.dispatch(userActions.logout());   
  }

  onSubmit(username, password){    
    this.props.dispatch(userActions.login(username,password));    
  }
  render() {
    return (
      <div        
        style={{
          margin: 'auto',
          backgroundColor: 'transparent'
        }}
      > 
      <SignIn onSubmit={this.onSubmit.bind(this)} loading={this.props.loggingIn}/>        
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedloginPage = connect(mapStateToProps)(LoginPage);

export { connectedloginPage as LoginPage};
