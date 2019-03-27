import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class UserEdit extends Component{
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
    
    render(){        
        return(
            <div>
                <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">شماره موبایل/نام کاربری</InputLabel>
                <Input id="userName" name="email" autoComplete="email" autoFocus value={this.state.userName} onChange={this.onChange.bind(this)}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">رمز عبور</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password} onChange={this.onChange.bind(this)} />
                </FormControl>
            </div>                                      
        );
    }
}

export default UserEdit;