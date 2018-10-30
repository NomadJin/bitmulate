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

  handleChangeMode = () => {
    const { mode, AuthActions } = this.props
    const inverted = mode === 'login' ? 'register' : 'login'
    AuthActions.setModalMode(inverted)
  }
  
  render() {
    const { visible, mode } = this.props
    const { handleChangeMode } = this
    
    return (
      <LoginModal visible={visible} mode={mode} onChangeMode={handleChangeMode}/>
    )
  }
}

export default connect(
    (state) => ({
      visible: state.auth.getIn(['modal', 'visible']),
      mode: state.auth.getIn(['modal', 'mode'])
    }),
    (dispatch) => ({
      BaseActions: bindActionCreators(baseActions, dispatch),
      AuthActions: bindActionCreators(authActions, dispatch)
    })
)(onClickOutside(LoginModalContainer))