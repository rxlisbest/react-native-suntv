import actionTypes from './actionTypes'

export function change(token) { // 统一管理action
  return {
    type: actionTypes.CHANGE,
    token: token
  }
}