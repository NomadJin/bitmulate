import React from 'react'
import styles from './InputError.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const InputError = ({children, ...rest}) => {
    return (
        <div className={cx('input-error')} {...rest}>
            {children}
        </div>
    )
}

export default InputError