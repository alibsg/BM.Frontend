import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dashboard from '../dashboard/Dashboard'

class DashboardPage extends Component{

    render(){
        return(
            <div>
                <Dashboard/>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {}
}

export default connect(mapStateToProps)(DashboardPage)

