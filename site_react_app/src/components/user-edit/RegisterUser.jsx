import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import UserEdit from './UserEdit'

const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },       
});

class RegisterUser extends Component{
    onUserChange(user){
      const { onChange } = this.props;
      if(onChange)
        onChange(user);
    }
    render(){
      const { classes } = this.props;
      return(
        <Paper className={classes.paper}>
              <UserEdit onChange={this.onUserChange.bind(this)}/>                           
        </Paper>
      );
    }
}

export default withStyles(styles)(RegisterUser);