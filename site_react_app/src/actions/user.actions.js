import { userConstants } from '../constants'

export const userActions = {
    login,    
}

function login(username,password) {
    return {
        type: userConstants.LOGIN_REQUEST,
        payload: {username , password}
    }
};