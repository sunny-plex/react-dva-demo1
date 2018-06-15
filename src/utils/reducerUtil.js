/* reducer utils */

// there should be a stateProp in your dispatch action.
export const simpleReducer = (state, action) => {
  const updatedState = state
  updatedState[action.stateProp] = action.payload
  return Object.assign({}, updatedState)
}

// update state using a targetStateProp in your reducer instead of a stateProp in your dispatch action.
export const reducerUpdate = (state, targetStateProp, payload) => {
  const updatedState = state
  updatedState[targetStateProp] = payload
  return Object.assign({}, updatedState)
}
