import React from 'react'
import styles from './SectionWithTitle.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const SectionWithTitle = ({title, children}) => {
    return (
        <div className={cx('section-with-title')}>
            <h3>{title}</h3>
            <section>
                {children}
            </section>
        </div>
    )
}

export default SectionWithTitle