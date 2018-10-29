import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'

// action type
const TOGGLE_LOGIN_MODAL = 'domain/TOGGLE_LOGIN_MODAL'
const SET_MODAL_MODE = 'auth/SET_MODAL_MODE'

// action creator
export const toggleLoginModal = createAction(TOGGLE_LOGIN_MODAL)
export const setModalMode = createAction(SET_MODAL_MODE)

// initial state
const initialState = Map({
    modal: Map({
        visible: false,
        mode: 'login'
    }),
})

// reducer
export default handleActions({
    [TOGGLE_LOGIN_MODAL]: (state, action) => {
        return state.updateIn(['modal', 'visible'], visible => !visible)
    },
    [SET_MODAL_MODE]: (state, action) => {
        return state.setIn(['modal', 'mode'], action.payload)
    }
}, initialState)