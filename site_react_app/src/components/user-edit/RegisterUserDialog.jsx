import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {MuiThemeProvider, createMuiTheme, createGenerateClassName, jssPreset} from '@material-ui/core/styles'
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import rtl from 'jss-rtl';
import RegisterUser from './RegisterUser'

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
    handleClose = () => {
        if(this.props.onSubmit){
            this.props.onSubmit();
        }                
    }

    render() {       
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
                <form >
                <DialogContent>
                    <RegisterUser/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="secondary">
                        لغو
                    </Button>
                    <Button type= 'submit' color="primary">
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

// We need an intermediary variable for handling the recursive nesting.
export default RegisterUserDialog;