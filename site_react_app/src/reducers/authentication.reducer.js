import { userConstants } from '../constants'

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? {loggedIn: true, user } : {};

export const authentication = (state = initialState, action) => {
    switch( action.type){
        case userConstants.LOGIN_REQUEST:
            console.log(action.type,action.user);
            return {
                loggingIn: true,
                user: action.user,
            };
        case userConstants.LOGIN_SUCCESS:
            console.log(action.type,action.user);
            return {
                loggedIn: true,
                user: action.user,
            };

        case userConstants.LOGIN_FAILURE:
            console.log(action.type,action.user);
            return {};
        default:
            return state;
    }

}

