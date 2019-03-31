import { userConstants } from '../constants'
import { userService } from '../services'
import { history } from '../tools/history'

export const userActions = {
    login, 
    logout,
    register,   
}

function login(username, password) {
    
    return dispatch => {
        dispatch(toReducer(userConstants.LOGIN_REQUEST , { username }));
        userService.login(username, password).then(
            user => {
                dispatch(toReducer(userConstants.LOGIN_SUCCESS,user));
                history.push('/');
            },
            error => {
                dispatch(toReducer(userConstants.LOGIN_FAILURE,error.toString()))
            }
        )            
    }
};

function logout(){
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user){
    return dispatch => {
        dispatch(toReducer(userConstants.REGISTER_REQUEST,user));
        userService.register(user).then(
            user => {
                dispatch(toReducer(userConstants.REGISTER_SUCCESS,user));
            },
            error => {
                dispatch(toReducer(userConstants.REGISTER_FAILURE,error.toString()));
            }
        )

    }

}

function toReducer(type,payload) {
    return {
        type,
        user: payload,
    }
} 