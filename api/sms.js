import { post } from './Request'

export function create(data) {
  return post('sms/create', data)
}