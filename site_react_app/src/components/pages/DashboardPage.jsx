import React, { Component } from 'react'
import { userService } from '../../services'
import Dashboard from '../dashboard/Dashboard'

class DashboardPage extends Component{
    onExit = ()=> {
        userService.logout();
        window.location.reload(true);
    }
    render(){
        return(
            <div>
                <Dashboard onDashboardExit={this.onExit}/>
            </div>
        )
    }
}

export default DashboardPage;

