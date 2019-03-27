import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import RegisterUser from './RegisterUser'

const styles = theme => ({
  paper: {
    position: 'absolute',    
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    top: theme.spacing.unit * 5,
    left: theme.spacing.unit * 5,    
  },
});

class RegisterUserModal extends Component {    
    handleClose = () => {
        if(this.props.onSubmit){
            this.props.onSubmit();
        }                
    }

    render() {
        const { classes } = this.props;    
        return (     
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.open}
                onClose={this.handleClose}
            >
                <div className={classes.paper}>
                <RegisterUser/>            
                </div>
            </Modal>
        );
    }
}

RegisterUserModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
export default withStyles(styles)(RegisterUserModal);
