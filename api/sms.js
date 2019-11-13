import { post } from './request'

export function create(data) {
  return post('sms/create', data)
}