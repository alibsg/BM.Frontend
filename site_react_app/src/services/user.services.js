import { config } from '../constants'
import { isAllDigit } from '../tools'
import { authHeader } from '../tools/auth.header'

export const userService = {
    login,
    logout,
    register,
    getAll,
}

function login(username, password){
    let loginuser = {
        username,
        password,
    }
    if(isAllDigit(username)){
        loginuser = {
            MobileNumber: username,
            password,
        }
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginuser),
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function register(user){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    };
    return fetch(`${config.apiUrl}/users/register`, requestOptions)
        .then(handleResponse)
        .then(user => {            
            return user;
        });
}

function getAll(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);        
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
} 

function handleResponse(response) {
    return response.text().then(text => {
        console.log(text)
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

