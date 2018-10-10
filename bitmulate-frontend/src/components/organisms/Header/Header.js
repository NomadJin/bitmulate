import React from 'react'
import styles from './Header.scss'
import classNames from 'classnames/bind'
import { Logo } from '../../index'

const cx = classNames.bind(styles)

const Header = () => {
    return (
        <div className={cx('header')}>
            <div className={cx('responsive')}>
                <div className={cx('logo-wrapper')}>
                    <Logo/>
                </div>
                <div className={cx('right-side')}>
                    나눔스퀘어?? 이상하게 적용이 되는것같은데
                </div>
            </div>
        </div>
    )
}

export default Header