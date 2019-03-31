import React, { Component } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

class UserEdit extends Component{
    constructor(){
        super();
        this.state = {
            user:{
                FirstName :'', 
                LastName: '',
                Sex: '',
                Age: '',
                MobileNumber: '',
                Email: '',
                Education: '', 
                MaritalStatus: '',
                UserName:'',
                Password: '',
                PasswordConfirm: '',
            }
        }
        
        this.userFieldProp = [
            {
                name:'نام',
                required:true,
            },
            {
                name:'نام خانوادگی',
                required:true,                
            },
            {
                name: 'جنسیت',
                required:true,
                options: ['زن','مرد']
            },
            {
                name:'سن',
                required:true,
                type: 'number',
            },            
            {
                name:'شماره تلفن همراه',
                required:true,
            },
            {
                name:'ایمیل',
                type: 'email',
            },
            {
                name:'تحصیلات',
            },
            {
                name:'مجرد/متاهل',
                required:true,
                options: ['مجرد','متاهل']
            },
            {
                name:'نام کاربری',
                required:true,
            },
            {
                name:'رمز عبور',
                required:true,
                type:'password',
            },
            {
                name:'تکرار رمز عبور',
                required:true,
                type:'password',
            },
        ]
    }

    onChange(event){
        this.setState({ user: {...this.state.user , [event.target.id || event.target.name] : event.target.value}});
        if(this.props.onChange){
            this.props.onChange(this.state.user);
        }
    }
    
    onPasswordValidation(event){
        const { Password, PasswordConfirm} = this.state.user;
        debugger
        event.target.setCustomValidity('');
        if(event.target.validity.valid){
            if(Password !== PasswordConfirm){
                event.target.setCustomValidity('تکرار رمز عبور با رمز عبور برابر نیست.');
            }

        }
        else{
            event.target.setCustomValidity('لطفا این فیلد را پر کنید');
        }
    }
    
    render(){ 
        
        const { user } = this.state;
        return(
            <div>
                {Object.keys(user).map( (key,idx) => (                    
                    <TextField
                        key={idx}
                        fullWidth
                        margin="normal"
                        style={{padding: '10px' }} 
                        label= {this.userFieldProp[idx].name}
                        required={this.userFieldProp[idx].required}
                        type={this.userFieldProp[idx].type? this.userFieldProp[idx].type:null} 
                        id={`${key}`} 
                        name={`${key}`} 
                        autoComplete='off' 
                        value={user[`${key}`]} 
                        select={this.userFieldProp[idx].options?true:false}
                        //onInvalid={this.userFieldProp[idx].type === 'password' ? this.onPasswordValidation.bind(this):undefined}
                        SelectProps={
                            this.userFieldProp[idx].options?
                            {MenuProps: {
                                style:{
                                    width: 600,
                                }
                            }}:
                            null
                        }
                        onChange={this.onChange.bind(this)}
                    >
                        {this.userFieldProp[idx].options?
                            this.userFieldProp[idx].options.map((option,idx) =>(
                                <MenuItem key={idx} value={option}>
                                {option}
                                </MenuItem>
                            )):null
                        }
                    </TextField>
                ))}  
            </div>                                      
        );
    }
}

export default UserEdit;