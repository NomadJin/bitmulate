import { createStore, applyMiddleware, compose} from 'redux'
import penderMiddleware from 'redux-pender'

const isDev = process.env.NODE_ENV === 'development'

const devtools = isDev && window.devToolsExtention 
  ? window.devToolsExtention 
  : () => fn => fn

const configureStore =  (initialState) => {
    const enhancers = [
        applyMiddleware(
            penderMiddleware()
        ),
        devtools()
    ]

    const store = createStore(modules, initialState, compose(...enhancers))

    return store
}

export default configureStore

