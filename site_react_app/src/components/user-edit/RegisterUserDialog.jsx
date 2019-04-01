import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress'
import {MuiThemeProvider, createMuiTheme, createGenerateClassName, jssPreset} from '@material-ui/core/styles'
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import rtl from 'jss-rtl';
import RegisterUser from './RegisterUser'
import { DialogContentText } from '@material-ui/core';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

const theme = createMuiTheme({
    direction: 'rtl',
    typography: {
      useNextVariants: true,
      fontFamily: '"Vazir", sans-serif'
    },
});

class RegisterUserDialog extends Component {
    user = {};    
    handleClose = ()=>{
        if(this.props.onSubmit){
            this.props.onSubmit(null);
        }                
    }

    onUserChange = (user) => {
        this.user = user;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.props.onSubmit){
            this.props.onSubmit(this.user);
        }
    }

    render() { 
        console.log('render ',this.props)      
        return ( 
            <MuiThemeProvider theme={theme}>
            <JssProvider jss={jss} generateClassName={generateClassName}>
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                style={
                    {
                        direction: 'rtl',
                        flex: 1,
                        alignItems:'center',
                        ustifyContent:'center',
                    }
                }
            >
                <DialogTitle id="form-dialog-title">ثبت کاربر جدید</DialogTitle>
                <form onSubmit={this.handleSubmit}>
                <DialogContent>
                    <RegisterUser onChange={this.onUserChange}/>
                </DialogContent>
                {this.props.registerError&&
                <DialogContent>
                    <DialogContentText color='error'>
                    خطا در ثبت کاربر. لطفا مجددا تلاش نمایید.
                    </DialogContentText>
                </DialogContent>
                }
                {this.props.registering&&
                <LinearProgress />
                }
                <DialogActions>
                    <Button onClick={this.handleClose} color="secondary">
                        لغو
                    </Button>
                    <Button type='submit' color="primary">
                        تایید
                    </Button>
                </DialogActions>
                </form>                
            </Dialog>
            </JssProvider>
            </MuiThemeProvider>
        );
    }
}

export default RegisterUserDialog;