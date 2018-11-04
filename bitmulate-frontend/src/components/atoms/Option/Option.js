import React from 'react'
import styles from './Option.scss'
import classNames from 'classnames/bind'
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md"

const cx = classNames.bind(styles)

const Option = ({children, active, onClick}) => {
    return (
        <div className={cx('option', {
            active
        })} onClick={onClick}>
            <div className={cx('check-box')}>
                <MdCheckBoxOutlineBlank className={cx('blank')}/>
                <MdCheckBox className={cx('checked')}/>
            </div>
            <div className={cx('text')}>{children}</div>
        </div>
    )
}

export default Option