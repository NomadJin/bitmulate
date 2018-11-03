import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { HomePage, TradePage } from './index'
import { ScreenMaskContainer, LoginModalContainer, RegisterScreenContainer } from '../containers'

class App extends Component {
    render() {
        return (
            <div>
               <Route exact path="/" component={HomePage}/>
               <Route path="/trade" component={TradePage}/>
               <ScreenMaskContainer/>
               <LoginModalContainer/>
               <RegisterScreenContainer/>
            </div>
        )
    }
}

export default App