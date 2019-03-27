import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {MuiThemeProvider, createMuiTheme, createGenerateClassName, jssPreset} from '@material-ui/core/styles'
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import UserEdit from './UserEdit'

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
        marginTop: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },       
    form: {
      direction: 'rtl',
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },  
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing.unit*2,    
    },    
});

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

class RegisterUser extends Component{
    onSubmit(event){
        event.preventDefault();
        if(this.props.onSubmit){
            this.props.onSubmit();
        }        
    }
    render(){
        const { classes } = this.props;
        return(
            <MuiThemeProvider theme={theme}>
            <JssProvider jss={jss} generateClassName={generateClassName}>
            <main className={classes.main}>
              <CssBaseline />
              <Paper className={classes.paper}>                
                <Typography component="h1" variant="h5">
                  ثبت کاربر جدید
                </Typography>
                <form onSubmit={this.onSubmit.bind(this)} className={classes.form}>
                    <UserEdit/>                           
                </form>
              </Paper>
            </main>
            </JssProvider>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(RegisterUser);