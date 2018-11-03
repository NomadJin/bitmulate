import React from 'react'
import styles from './SelectCurrency.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Currency = ({children, active}) => (
    <div className={cx('currency', {active})}>
        {children}
    </div>
)

const SelectCurrency = ({selectedCurrency}) => {
    return (
        <div className={cx('select-currency')}>
            <Currency symbol="₩">KRW</Currency>
            <Currency symbol="$">USD</Currency>
            <Currency symbol="Ƀ">BTC</Currency>
        </div>
    )
}

export default SelectCurrency