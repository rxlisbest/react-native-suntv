import actionTypes from './actionTypes'

const defaultState = { // 初始化state
  token: ''
}

export default (state = defaultState, action) => {
  if (action.type == actionTypes.CHANGE) { // 修改state
    const newState = JSON.parse(JSON.stringify(state))
    newState.token = action.token
    return newState
  }
  return state
}