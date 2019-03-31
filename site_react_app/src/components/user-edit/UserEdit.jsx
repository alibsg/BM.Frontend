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
                MobileNumber: '',
                Email: '',
                Education: '', 
                MaritalStatus: '',
                Age: '',
                UserName:'',
                Password: '',
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
                name:'سن',
                required:true,
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
        ]
    }

    onChange(event){
        this.setState({ user: {...this.state.user , [event.target.id || event.target.name] : event.target.value}});
    }
    
    
    render(){ 
        
        const { user } = this.state;
        return(
            <div>
                {Object.keys(user).map( (key,idx) => (                    
                    <TextField
                        fullWidth
                        margin="normal"
                        style={{padding: '10px' }} 
                        label= {this.userFieldProp[idx].name}
                        required={this.userFieldProp[idx].required}
                        type={this.userFieldProp[idx].type? this.userFieldProp[idx].type:''} 
                        id={`${key}`} 
                        name={`${key}`} 
                        autoComplete='off' 
                        value={user[`${key}`]} 
                        select={this.userFieldProp[idx].options?true:false}
                        SelectProps={
                            this.userFieldProp[idx].options?
                            {MenuProps: {
                                style:{
                                    width: 600,
                                }
                            }}:
                            {}
                        }
                        onChange={this.onChange.bind(this)}
                    >
                        {this.userFieldProp[idx].options?
                            this.userFieldProp[idx].options.map(option =>(
                                <MenuItem key={option} value={option}>
                                {option}
                                </MenuItem>
                            )):
                            {}
                        }
                    </TextField>
                ))}  
            </div>                                      
        );
    }
}

export default UserEdit;