import { get, post } from './Request'

export function channelCreate(data) {
  return post('channels/create', data)
}

export function channelIndex(params) {
  return get('channels/index', params)
}