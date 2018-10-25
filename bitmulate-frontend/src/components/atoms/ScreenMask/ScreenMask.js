import React from 'react'
import styles from './ScreenMask.scss'
import Transition from 'react-transition-group/Transition'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const ScreenMask = ({ visible }) => (
  <Transition in={visible} timeout={150}>
    {(state) => {
        console.log(state)
        if(state === 'exited') return null
        return (
        <div className={cx(`fade-${state}`)}>
          <div className={cx('screen-mask')}/>
        </div>)
    }}
  </Transition>
);

export default ScreenMask