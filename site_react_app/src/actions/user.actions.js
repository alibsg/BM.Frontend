import { userConstants } from '../constants'
import { userService } from '../services'

export const userActions = {
    login,    
}

function login(username, password) {
    
    return dispatch => {
        dispatch(toReducer(userConstants.LOGIN_REQUEST , { username }));
        userService.login(username, password).then(
            user => {
                dispatch(toReducer(userConstants.LOGIN_SUCCESS,user));
            },
            error => {
                dispatch(toReducer(userConstants.LOGIN_FAILURE,error.toString()))
            }
        )            
    }
    
    function toReducer(type,payload) {
        return {
            type,
            user: payload,
        }
    } 
};