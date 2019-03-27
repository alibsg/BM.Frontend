/* eslint-disable linebreak-style */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-one-expression-per-line */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';
import Fab from '@material-ui/core/Fab'
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check'
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {MuiThemeProvider, createMuiTheme, createGenerateClassName, jssPreset} from '@material-ui/core/styles'
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';


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
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
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
  buttonSuccess: { 
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
  fabProgress: {
    color: blue[500],
    position: 'absolute',
    zIndex: 1,
  },
});

const theme = createMuiTheme({
  direction: 'rtl',
  typography: {
    useNextVariants: true,
    fontFamily: '"Vazir", sans-serif'
  },
});

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

class SignIn extends Component {
  constructor(){
    super();
    this.state = {
      userName: '',
      password: '',
    }
    
  }

  onChange(event){
    this.setState({ [event.target.id] : event.target.value});
  }
  onSubmit(event){
    event.preventDefault();
    const {userName, password} = this.state;
    if(this.props.onSubmit){
      this.props.onSubmit(userName, password);
    }
  }

  render(){
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
      <JssProvider jss={jss} generateClassName={generateClassName}>
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ورود
          </Typography>
          <form onSubmit={this.onSubmit.bind(this)} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">شماره موبایل/نام کاربری</InputLabel>
              <Input id="userName" name="email" autoComplete="email" autoFocus value={this.state.userName} onChange={this.onChange.bind(this)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">رمز عبور</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password} onChange={this.onChange.bind(this)} />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="مرا به خاطر بسپار"
            />
            <div className={classes.wrapper}>
              <Fab 
                type="submit"                                         
                color="primary" 
                className={classes.buttonSuccess}
              >
                <CheckIcon />
              </Fab>
              {this.props.loading && <CircularProgress size={68} className={classes.fabProgress} />}
            </div>
          </form>
        </Paper>
      </main>
      </JssProvider>
      </MuiThemeProvider>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
