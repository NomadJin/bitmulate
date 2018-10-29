import React from 'react'
import styles from './SocialLoginButton.scss'
import classNames from 'classnames/bind'
import { IoLogoFacebook,  IoLogoGoogleplus} from "react-icons/io"

const cx = classNames.bind(styles)

const SocialLoginButton = () => {
    return (
        <div className={cx('social-login-button')}>
            <div className={cx('facebook')}>
                <IoLogoFacebook/>
            </div>
            <div className={cx('google')}>
                <IoLogoGoogleplus/>
            </div>
        </div>
    )
}

export default SocialLoginButton