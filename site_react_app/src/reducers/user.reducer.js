import { userConstants } from '../constants'

export function userReducer(state= {} , action){
    switch(action.type){
        case userConstants.GETALL_REQUEST:
            return{
                gettingUsers: true,                
            }        
        case userConstants.GETALL_SUCCESS:
            return{
                getUsersSuccess: true,
                users: action.payload,
            }
        
        case userConstants.GETALL_FAILURE:
            return{
                getUsersError: true,
                getUsersErrorMessage: action.payload,
            }
        default:
            return state;
    }
}