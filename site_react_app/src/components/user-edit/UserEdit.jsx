import React, { Component } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import TextField from '@material-ui/core/TextField';
import { config } from '../../constants'

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

class UserEdit extends Component{
    constructor(){
        super();
        this.state = {
            user:{
                FirstName :'', 
                LastName: '',
                Sex: 0,
                BDate: null,
                MobileNumber: '',
                Email: '',
                Education: '', 
                MaritalStatus: 0,
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
                name:'تاریخ تولد',
                required:true,
                type: 'date',
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
    componentWillReceiveProps( props)
    {
        if(props.onChange){
            props.onChange(this.state.user);
        }
    }

    onBirthDateChange(date){
        this.setState({ user: {...this.state.user ,  BDate: date._d}});
        if(this.props.onChange){
            this.props.onChange(this.state.user);
        }
    }
    onChange(event){
        this.setState({ user: {...this.state.user , [event.target.id || event.target.name] : event.target.value}});
        if(this.props.onChange){
            this.props.onChange(this.state.user);
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
        let fieldProp=this.userFieldProp[idx];
        const { user } = this.state;
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth();
        let day = now.getDate();

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
                    onChange={this.onBirthDateChange.bind(this)}
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
                    //onInvalid={fieldProp.type === 'password' ? this.onPasswordValidation.bind(this):undefined}
                    SelectProps={
                        fieldProp.options?
                        {MenuProps: {
                            style:{
                                width: 600,
                            }
                        }}:
                        null
                    }
                    onChange={this.onChange.bind(this)}
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
        
        const { user } = this.state;
        return(
            <div>
                {Object.keys(user).map( (key,idx) => (
                    this.getInputComponnet(key,idx)
                    /*
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
                </TextField>*/
                ))}  
            </div>                                      
        );
    }
}

export default UserEdit;