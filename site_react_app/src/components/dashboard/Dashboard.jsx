import React from 'react';
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PersonIcon from '@material-ui/icons/Person';
import LinearProgress from '@material-ui/core/LinearProgress';
import {MuiThemeProvider, createMuiTheme, createGenerateClassName, jssPreset} from '@material-ui/core/styles'
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { mainListItems } from './listItems';
import UsersTable from './UsersTable';
import { viewPanelEnum } from './viewPanelEnum.ts'
import { userActions } from '../../actions'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    direction: 'rtl',
    display: 'flex',
  },
  toolbar: {
    direction: 'rtl',
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  }, 
  
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
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

class Dashboard extends React.Component {
  
  state = {
    open: true,
    viewPanel: viewPanelEnum.nothing,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  onDrawerButtonClick = (event) => {
    switch(event.currentTarget.id){
      case 'drawer_button_exit':
        if(this.props.onDashboardExit){
          this.props.onDashboardExit()
        }
      break;
      case 'drawer_button_users':
        this.props.dispatch(userActions.getAll())
        this.setState({ ...this.state ,viewPanel: viewPanelEnum.users, });    
      break;
      case 'drawer_button_reports':
        this.setState({ ...this.state ,viewPanel: viewPanelEnum.reports, });   
      break;
      default:
        break
    }
  }

  render() {
    const { 
      classes,
      users,
      gettingUsers,
      getUsersSuccess,
      getUsersErrorMessage,
      getUsersError, 
    } = this.props;
    const { viewPanel } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
      <JssProvider jss={jss} generateClassName={generateClassName}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
              direction='rtl'
            >
              پنل کاربری
            </Typography>
            <IconButton color="inherit">
                <PersonIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems(this)}</List>
          <Divider />
        </Drawer>
        { viewPanel === viewPanelEnum.users && ShowUsersPanel()}
      </div>
      </JssProvider>
      </MuiThemeProvider>
    );

    function ShowUsersPanel() {
      if(gettingUsers){
        return(
          <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <LinearProgress />
          </main>
        )
      }
      else if(getUsersSuccess){
        return(
          <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Typography 
                variant="h4" 
                gutterBottom 
                component="h2"
                direction='rtl'
              >
                کاربران
              </Typography>
              <div className={classes.tableContainer}>
                <UsersTable users={users}/>
              </div>
          </main>
        )
      }
    }
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state =>{
  const { 
      users,
      gettingUsers,
      getUsersSuccess,
      getUsersErrorMessage,
      getUsersError, 
  } = state.userReducer;
  return {
    users,
    gettingUsers,
    getUsersSuccess,
    getUsersErrorMessage,
    getUsersError,
  }
}

//export default withStyles(styles)(connect(mapStateToProps)(Dashboard))

export default compose(
  withStyles(styles, {
      name: 'Dashboard',
  }),
  connect(mapStateToProps),
)(Dashboard);