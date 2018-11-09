import React from 'react'
import styles from './UserButton.scss'
import classNames from 'classnames/bind'
import { MdPerson } from "react-icons/md"

const cx = classNames.bind(styles)

const UserButton = ({displayName}) => {
    return (
        <div className={cx('user-button')}>
            <MdPerson/>
            <div className={cx('display-name')}>
                {displayName}
            </div>
        </div>
    )
}

export default UserButton