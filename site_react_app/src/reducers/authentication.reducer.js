import { userConstants } from '../constants'

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? {loggedIn: true, user } : {};

export const authentication = (state = initialState, action) => {
    console.log(action.type,action.payload);
    switch( action.type){
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.payload,
            };
            
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.payload,
            };

        case userConstants.LOGIN_FAILURE:
            return {};

        case userConstants.LOGOUT:
            return {};

        case userConstants.REGISTER_REQUEST:
            return { registering: true };

        case userConstants.REGISTER_SUCCESS:
            return { registerSuccess: true };

        case userConstants.REGISTER_FAILURE:
            return {
              registerError: true,
              errorMessage: action.payload,
            };

        default:
            return state;
    }

}

