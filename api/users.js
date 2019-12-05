import { post } from './Request'

export function usersLogin(data) {
  return post('users/login', data)
}

export function usersCreate(data) {
  return post('users/create', data)
}

export function usersRegister(data) {
  return post('users/register', data)
}

export function usersPasswordLogin(data) {
  return post('users/password-login', data)
}