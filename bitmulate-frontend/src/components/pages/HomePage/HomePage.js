import React from 'react'
import { PageTemplate, Header, PolyBackground } from '../../index'
import styles from './HomePage.scss';
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

const HomePage = () => {
    return (
        <PageTemplate
            header={<Header/>}>
            <PolyBackground>
            </PolyBackground>
        </PageTemplate>
    )
}

export default HomePage