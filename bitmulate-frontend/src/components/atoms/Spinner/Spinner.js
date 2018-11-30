import React from 'react'
import styles from './Spinner.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Spinner = () => {
    return (
        <div className={cx('spinner')}>

        </div>
    )
}

export default Spinner