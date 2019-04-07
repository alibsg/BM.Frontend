import React, { Component } from 'react'
import { connect } from 'react-redux'
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

const mapStateToProps = state =>{
    return {}
}

export default connect(mapStateToProps)(DashboardPage)

