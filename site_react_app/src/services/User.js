
export class User{
    user = {
        Id: 0,
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
    userFieldProp = [
        {
            name:'شناسه',            
        },
        {
            name:'نام',
            required:true,
            visible: true,
        },
        {
            name:'نام خانوادگی',
            required:true, 
            visible: true,               
        },
        {
            name: 'جنسیت',
            required:true,
            options: ['زن','مرد'],
            visible: true,
        },
        {
            name:'تاریخ تولد',
            required:true,
            type: 'date',
            visible: true,
        },            
        {
            name:'شماره تلفن همراه',
            required:true,
            visible: true,
        },
        {
            name:'ایمیل',
            type: 'email',
            visible: true,
        },
        {
            name:'تحصیلات',
            visible: true,
        },
        {
            name:'مجرد/متاهل',
            required:true,
            options: ['مجرد','متاهل'],
            visible: true,
        },
        {
            name:'نام کاربری',
            required:true,
            visible: true,
        },
        {
            name:'رمز عبور',
            required:true,
            type:'password',
            visible: true,
        },
        {
            name:'تکرار رمز عبور',
            required:true,
            type:'password',
            visible: true,
        },
    ]  
}
