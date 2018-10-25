import React, { Component } from 'react'
import styles from './Modal.scss'
import classNames from 'classnames/bind'
import Transition from 'react-transition-group/Transition'

const cx = classNames.bind(styles)

class ModalWrapper extends Component {
  render() {
    const { visible, children } = this.props

    return (
      <div className={cx('modal-wrapper')}>
        <Transition in={ visible } timeout={300}>
          {(state) => {
            console.log(state)
            return(
            <div className={cx(`${state}`)}>
              <div className={cx('modal')}>
                { children }
              </div>
            </div>
            )
          }}
        </Transition>
      </div>
    )
  }
}

export default ModalWrapper