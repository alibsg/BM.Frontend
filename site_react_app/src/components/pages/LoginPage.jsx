/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import SignIn from '../sign-in/SignIn.jsx'
import RegisterUserModal from '../user-edit/RegisterUserModal'
import { userActions } from '../../actions'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openRegister: false,
    } 
    // reset login status
    this.props.dispatch(userActions.logout());   
  }

  onSubmit(username, password){    
    this.props.dispatch(userActions.login(username,password));    
  }

  onRegister(){
    this.setState({ openRegister: true, });
  }
  onRegisterUserModalSubmit(){
    this.setState({ openRegister: false, });
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
      <Button onClick={this.onRegister.bind(this)}>Register User</Button>
      <RegisterUserModal 
        open={this.state.openRegister} 
        onSubmit={this.onRegisterUserModalSubmit.bind(this)}
      />
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
