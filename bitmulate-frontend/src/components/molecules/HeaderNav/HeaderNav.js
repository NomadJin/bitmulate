import React from 'react'
import { FlexBox, NavItem } from '../../../components'

const HeaderNav = () => {
    return (
        <FlexBox row>
            <NavItem>
                거래소
            </NavItem>
            <NavItem>
                대시보드
            </NavItem>
            <NavItem>
                커뮤니티
            </NavItem>
        </FlexBox>
    )
}

export default HeaderNav