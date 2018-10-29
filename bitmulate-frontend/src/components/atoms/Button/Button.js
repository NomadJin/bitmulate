import React from 'react'
import styles from './Button.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Button = ({
    children,
    flex,
    className,
    roundCorner,
    invert,
    flat,
    color,
    ...rest
}) => {
    return (
        <div className={cx('button', {
            invert,
            flex,
            flat
        }, color, className)
        } {...rest}>
            {children}
        </div>
    )
}

export default Button