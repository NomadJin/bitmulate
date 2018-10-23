import { createAction, handleActions } from 'redux-actions'
import { Map, List } from 'immutable'

// action type
const SET_SCREEN_MASK_VISIBILITY = 'domain/SET_SCREEN_MASK_VISIBILITY'

// action creato
export const setScreenMaskVisibility = createAction(SET_SCREEN_MASK_VISIBILITY)

// initial state
const initialState = Map({
    screenMask: Map({
        visible: false
    })
})

// reducer
export default handleActions({
    [SET_SCREEN_MASK_VISIBILITY]: (state, action) => {
        return state.setIn(['screenMask', 'visible'], action.payload)
    }
}, initialState)