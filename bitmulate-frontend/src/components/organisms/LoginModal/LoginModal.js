import React from 'react'
import styles from './LoginModal.scss'
import classNames from 'classnames/bind'
import { Modal } from '../../../components'

const cx = classNames.bind(styles)

const LoginModal = ({visible}) => {
    return (
        <Modal visible={visible}>
            <div className={cx('login-modal')}>
                두둠칫치치치
            </div>
        </Modal>
    )
}

export default LoginModal