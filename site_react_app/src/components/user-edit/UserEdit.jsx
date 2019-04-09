import React, { Component } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import TextField from '@material-ui/core/TextField';
import { config } from '../../constants'
import { User } from '../../services'

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

class UserEdit extends Component{
    constructor(){
        super();
        this.state = {
            user: new User()
        }
    }
    componentWillReceiveProps( props)
    {
        if(props.onChange){
            props.onChange(this.state.user.user);
        }
    }

    onBirthDateChange = date => {
        this.setState({ 
            user: {
                ...this.state.user ,
                user:{
                    ...this.state.user.user ,
                    BDate: date._d
                }
            }
        });
        if(this.props.onChange){
            this.props.onChange(this.state.user.user);
        }
    }
    onChange = event => {
        this.setState({ 
            user: {
                ...this.state.user ,
                user: {
                    ...this.state.user.user, [event.target.id || event.target.name] : event.target.value
                }  
            }
        });
        if(this.props.onChange){
            this.props.onChange(this.state.user.user);
        }
    }
    
    onPasswordValidation(event){
        const { Password, PasswordConfirm} = this.state.user;
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

    getInputComponnet = (key,idx) =>
    {
        let fieldProp = this.state.user.userFieldProp[idx];
        const { user } = this.state.user;
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth();
        let day = now.getDate();
        if(!fieldProp.visible){
            return null;
        }
        if(fieldProp.type === 'date'){
            return(
                <MuiPickersUtilsProvider key={idx} utils={JalaliUtils} locale="fa">
                <div className="picker">
                    <DatePicker
                    key={idx}
                    fullWidth
                    label={fieldProp.name}
                    id={`${key}`}
                    required={fieldProp.required}
                    disableFuture
                    okLabel="تأیید"
                    cancelLabel="لغو"
                    clearLabel="پاک کردن"
                    labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                    value={user[`${key}`]}
                    minDate={new Date(year - config.maxAge,month,day)} 
                    maxDate={ new Date(year - config.minAge,month,day)}
                    onChange={this.onBirthDateChange}
                    animateYearScrolling={false}
                    />
                </div>
                </MuiPickersUtilsProvider>
            )
        }
        else{            
            return(
                <TextField
                    key={idx}
                    fullWidth
                    margin="normal"
                    style={{padding: '10px' }} 
                    label= {fieldProp.name}
                    required={fieldProp.required}
                    type={fieldProp.type? fieldProp.type:null} 
                    id={`${key}`} 
                    name={`${key}`} 
                    autoComplete='off' 
                    value={user[`${key}`]} 
                    select={fieldProp.options?true:false}
                    SelectProps={
                        fieldProp.options?
                        {MenuProps: {
                            style:{
                                width: 600,
                            }
                        }}:
                        null
                    }
                    onChange={this.onChange}
                >
                    {fieldProp.options?
                        fieldProp.options.map((option,idx) =>(
                            <MenuItem key={idx} value={idx}>
                            {option}
                            </MenuItem>
                        )):null
                    }
                </TextField>

            )
        }
    }
    
    render(){ 
        
        const { user } = this.state.user;
        return(
            <div>
                {Object.keys(user).map( (key,idx) => (
                    this.getInputComponnet(key,idx)
                ))}  
            </div>                                      
        );
    }
}

export default UserEdit;