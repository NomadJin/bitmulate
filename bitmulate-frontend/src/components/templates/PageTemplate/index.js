import React from 'react'
import styles from './styles.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const PageTemplate = () => {
    return (
        <div className={cx('wrapper')}>
            Trade!
        </div>
    )
}

export default PageTemplate


