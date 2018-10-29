import React from 'react'
import styles from './SocialLoginButton.scss'
import classNames from 'classnames/bind'
import FacebookIcon from 'react-icons/lib/io/socail-facebook'
import GoogleIcon from 'react-icons/lib/io/social-googleplus'

const cx = classNames.bind(styles)

const SocialLoginButton = () => {
    return (
        <div className={cx('social-login-button')}>
            <div className={cx('facebook')}>
            
            </div>
            <div className={cx('google')}>

            </div>
        </div>
    )
}

export default SocialLoginButton