import React from 'react';
import { Route ,Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: ComponentTo, ...rest }) => (
    <Route { ...rest} render={ props => (
        localStorage.getItem('user')?
        <ComponentTo {...props} />:
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )}
    />
)