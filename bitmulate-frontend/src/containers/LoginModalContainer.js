import React, { Component } from 'react'
// import redux dependencies
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { LoginModal } from '../components'
import onClickOutside from 'react-onclickoutside'
import * as baseActions from '../store/modules/base'
import * as authActions from '../store/modules/auth'

class LoginModalContainer extends Component {
  handleClickOutside = evt => {
    const { visible, BaseActions, AuthActions } = this.props
    if(!visible) return
    BaseActions.setScreenMaskVisibility(false)
    AuthActions.toggleLoginModal()
  }
  
  render() {
    const { visible } = this.props
    
    return (
      <LoginModal visible={visible}/>
    )
  }
}

export default connect(
    (state) => ({
      visible: state.auth.getIn(['modal', 'visible'])
    }),
    (dispatch) => ({
      BaseActions: bindActionCreators(baseActions, dispatch),
      AuthActions: bindActionCreators(authActions, dispatch)
    })
)(onClickOutside(LoginModalContainer))