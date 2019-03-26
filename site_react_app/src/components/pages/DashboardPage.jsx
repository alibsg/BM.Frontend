import React, { Component } from 'react'
import { connect } from 'react-redux'

class DashboardPage extends Component{

    render(){
        return(
            <div>This page is not ready!!!</div>
        )
    }
}

const mapStateToProps = state =>{
    return {}
}

export default connect(mapStateToProps)(DashboardPage)

