import React, { Component } from 'react'
import { Header } from '../components/index'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as baseActions from '../store/modules/index'

class HeaderContainer extends Component {
    render() {
        return (
           <Header/>
        )
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        Actions: bindActionCreators(baseActions, dispatch)
    })
)(HeaderContainer)