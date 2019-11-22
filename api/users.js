import { post } from './request'

export function usersLogin(data) {
  return post('users/login', data)
}