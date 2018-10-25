import React from 'react'
import styles from './ScreenMask.scss'
import classNames from 'classnames/bind'
import CSSTransition from 'react-transition-group/CSSTransition'

const Fade = ({ children, ...props }) => (
    <CSSTransition
      {...props}
      timeout={500}
      classNames={cx('fade')}  
    >
      {children}
    </CSSTransition>
)

const cx = classNames.bind(styles)

const ScreenMask = ({visible}) => {
    if(!visible) return null

    return (
        <Fade in={false}>
            { visible && <div className={cx('screen-mask')}/> }
        </Fade>
    )
}

export default ScreenMask