import { post } from './request'

export function usersLogin(data) {
  return post('users/login', data)
}

export function usersCreate(data) {
  return post('users/create', data)
}