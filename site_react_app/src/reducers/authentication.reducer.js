import { userConstants } from '../constants'

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? {loggedIn: true, user } : {};

export const authentication = (state = initialState, action) => {
    switch( action.type){
        case userConstants.LOGIN_REQUEST:
        case userConstants.LOGIN_SUCCESS:
        case userConstants.LOGIN_FAILURE:
        default:
            return state;
    }

}

