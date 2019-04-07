
export class User{
    user = {
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
