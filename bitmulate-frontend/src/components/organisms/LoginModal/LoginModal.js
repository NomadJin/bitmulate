import React from 'react'
import styles from './LoginModal.scss'
import classNames from 'classnames/bind'
import { Modal, Input } from '../../../components'

const cx = classNames.bind(styles)

const LoginModal = ({visible}) => {
    //if(!visible) return null
    return (
        <Modal visible={visible}>
            <div className={cx('login-modal')}>
                <div className={cx('bar')}></div>
                <div className={cx('content')}>
                    <h2>로그인</h2>
                    <div className={cx('form')}>
                        <Input fullWidth big placeholder="이메일"/>
                        <Input fullWidth big placeholder="비밀번호" type="password"/>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default LoginModal